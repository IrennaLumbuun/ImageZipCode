from flask import Response, request, jsonify
from flask_restful import Resource
from service.image_handler import handle_image, is_jpeg
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
            image = body.get('base64', None)
            if is_jpeg(image):
                zipcode = handle_image(image)
        except Exception as e:
            error_message = {
                'error': get_exception_message(e)
            }
            return error_message, get_exception_status_code(e)

        return zipcode
