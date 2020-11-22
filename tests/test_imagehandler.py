import os
import tempfile
from flask_cors import CORS, cross_origin
import json
import pytest
from flask import Flask
from app import app

with open('./resources/version.json') as json_file:
    version_info = json.load(json_file)
    version = version_info.get('version')

with open('./tests/mockdata.json') as mockdata_file:
    base64s = json.load(mockdata_file)

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def get_response_json(response_binary):
    response_string = response_binary.decode('ascii')
    response_json = json.loads(response_string)
    return response_json

def test_server_is_up_and_running(client):
    response = client.get('/release-info')
    response_json = get_response_json(response.data)
    assert response_json.get('version', -1) == version


def get_zipcode(client, b64_string):
    return client.post('/post', data=json.dumps(dict(
        base64=b64_string)), content_type='application/json'
    )

def test_get_zipcode(client):
    ''' Make sure get_zipcode works '''

    # Input 1: Image with exif metadata
    response = get_zipcode(client, base64s.get('has_exif'))
    response_json = get_response_json(response.data)
    assert response_json.get('success', None) == True
    assert response_json.get('probabilistic', None) == False
    assert response_json.get('address', None) != {}

    # Input 2: Image with no exif metada
    response = get_zipcode(client, base64s.get('no_exif'))
    response_json = get_response_json(response.data)
    assert response_json == None

    # Input 3: Not a JPEG
    response = get_zipcode(client, base64s.get('not_jpeg'))
    response_json = get_response_json(response.data)
    assert response_json.get('error', None) == "Image is not a JPEG"

    