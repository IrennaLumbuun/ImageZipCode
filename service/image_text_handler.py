import numpy as np
import cv2
import pytesseract
from price_parser import Price

'''
TODOs on this file:
- get the country name based on currency
'''

def get_ndarray(pil_img):
    return np.array(pil_img)

def get_text_from_pic(pil_img):
    nd_array = get_ndarray(pil_img)
    text = pytesseract.image_to_string(nd_array)
    return text

def parse_currency(text):
    price = Price.fromstring(text)
    currency = price.currency
    return currency
