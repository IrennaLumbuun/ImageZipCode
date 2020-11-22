import setuptools
import json
import os

with open('./resources/version.json') as json_file:
    version_info = json.load(json_file)
    version = version_info.get('version')


setuptools.setup(
    name='EVT-Project',
    version=version,
    author='Irenna Lumbuun',
    email='Irennanicole1@gmail.com',
    packages=setuptools.find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-cors',
        'geopy',
        'Pillow',
        'urllib3'
    ],
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
    ],
)