import io
from PIL import Image
from PIL.ExifTags import GPSTAGS, TAGS
from exceptions import *
import base64
from functools import partial
import geopy
import logging

logging.basicConfig(format='%(levelname)s: {%(pathname)s:%(lineno)d} \n%(message)s', level=logging.NOTSET)
logger = logging.getLogger(__name__)
geopy_helper = geopy.Nominatim(user_agent='image-handler')


def is_jpeg(b64: str) -> bool:
    return True


def handle_image(b64: str):
    logger.info('handle_image STARTED')
    # Convert to Pillow image
    img = base64.b64decode(b64)
    buf = io.BytesIO(img)
    pil_img = Image.open(buf)
    address = get_zipcode(pil_img)
    if address == None:
        logger.info('Fail to extract address')
        # do fallback
        pass
    else:
        logger.info(f'Address found. Returning {address}')
        # TODO: Jsonify address before returning
        return address



# source code: https://developer.here.com/blog/getting-started-with-geocoding-exif-image-metadata-in-python3
def get_zipcode(pil_img) -> int:
    logger.info('get_zipcode STARTED')
    try:
        labeled_exif = get_labeled_exif(pil_img)
        geotagging = get_geotagging(labeled_exif)
        coords = get_coordinates(geotagging)
        geocode = partial(geopy_helper.reverse, language='eng')
        address = geocode(f'{coords[0]} {coords[1]}')
        return address.raw
    except UnprocessableEntityError as err:
        logger.info("Unable to get zipcode")
        return None
        

'''
This method reads the metadata of the image
'''
def get_labeled_exif(pil_img):
    logger.info('get_labeled_exif STARTED')
    try:
        pil_img.verify()
    except Exception as e:
        logger.error('Fail to verify image at get_labeled_exif')
        logger.error(get_exception_message(e))
        raise UnprocessableEntityError(f"Unable to process image: {get_exception_message(e)}")

    exif = pil_img._getexif()
    labeled = {}
    for (key, val) in exif.items():
        labeled[TAGS.get(key)] = val
    logger.info(f'get_labeled_exif SUCCESS. Returning {labeled}')

    return labeled

'''
This method reads the geotag, given labeled exif
'''
def get_geotagging(exif):
    logger.info('get_geotagging STARTED')
    if not exif:
        logger.info('No EXIF metadata found')
        raise UnprocessableEntityError('No EXIF metadata found')

    geotagging = {}
    gps_info = exif.get('GPSInfo', None)
    if gps_info is None:
        logger.info('No EXIF geotagging found')
        raise UnprocessableEntityError('No EXIF geotagging found')

    for (key, val) in GPSTAGS.items():
        if gps_info.get(key, None) != None:
            geotagging[val] = gps_info[key]

    logger.info(f'geo_tagging success. Retuning {geotagging}')

    return geotagging


''' 
GPS Latitude and Longitude are stored in degrees, 
minutes, and seconds (DMS)

EXIF uses rational 64u (unsigned rational number)
to represent DMS value

How to convert dms to decimal, based on wikipedia: 
https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
decimal = degrees + (minutes/60) + (seconds /3600)

'''
def get_decimal_from_dms(dms, ref):
    degrees = dms[0]
    minutes = dms[1] / 60.0
    seconds = dms[2] / 3600.0

    print(degrees, minutes, seconds)
    if ref in ['S', 'W']:
        degrees = -degrees
        minutes = -minutes
        seconds = -seconds

    return round(degrees + minutes + seconds, 5)


def get_coordinates(geotags):
    try:
        lat = get_decimal_from_dms(geotags['GPSLatitude'], geotags['GPSLatitudeRef'])
        lon = get_decimal_from_dms(geotags['GPSLongitude'], geotags['GPSLongitudeRef'])
        logging.info(f'get_coordinates returning {lat, lon}')
        return (lat,lon)
    except Exception as e:
        logger.error('Fail to retrieve coordinate: Incomplete GPSInfo')
        logger.error(get_exception_message(e))
        raise UnprocessableEntityError('Fail to retrieve coordinate: Incomplete GPSInfo')


