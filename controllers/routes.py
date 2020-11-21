from .location import LocationApi

'''
    This files defines all the available endpoints 
    that can be accessed by the front-end client
'''


def initialize_routes(api):
    api.add_resource(LocationApi, '/post')