from flask import Response, request, jsonify
from flask_restful import Resource
from service.image_handler import is_jpeg, convert_b64_to_img, get_zipcode
from exceptions import *
import json

class LocationApi(Resource):
    def post(self):
        body = request.get_json()

        if body is None:
            error_message = {
                'error': 'Request must contain base64 image'
            }
            return error_message, 400
        
        try:
            b64_img = body.get('base64', None)
            pil_img = convert_b64_to_img(b64_img)
            is_jpeg(pil_img)
            address = get_zipcode(pil_img)
            if address is None:
                # do fallbacks
                pass
            return address 
        except Exception as e:
            error_message = {
                'success': False,
                'error': get_exception_message(e)
            }
            return error_message, get_exception_statuscode(e)

