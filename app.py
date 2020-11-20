from flask import Flask, render_template, url_for, request, session, redirect, jsonify
from flask_restful import Api
from flask_cors import CORS, cross_origin
from controllers.routes import initialize_routes
import os
import json

app = Flask(__name__)
CORS(app)  # this allows it to connect with react
app.config.from_object('configuration.config.Config')


api = Api(app)
initialize_routes(api)


@app.route('/release-info', methods=['GET'])
def release_info():
    version_path = os.path.join(app.root_path, 'resources/version.json')
    with open(version_path) as json_file:
        version_info = json.load(json_file)
    return jsonify(version_info)


if __name__ == '__main__':
    app.run(debug=True)