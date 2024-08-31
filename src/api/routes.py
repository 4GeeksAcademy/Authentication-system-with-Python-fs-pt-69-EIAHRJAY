"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#JWT secret
#app.config['SECRET_KEY'] =  os.getenv("JWT_SECRET")

SECRET_KEY = 'SECRET_KEY'

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Ruta para el registro de usuarios
@api.route('/signup', methods=['POST'])
def register():
    try:
        data = request.json
        new_user = User( is_active=data['is_active'], email=data['email'])
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "messege":"User created successfully"
            }), 200 #new_user.serialize()
    
    except KeyError as e:
        return jsonify({
            "message": "Missing required data",
            "error": str(e)
        }), 400
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while registering the user",
            "error": str(e)
        }), 500


# Ruta para el inicio de sesión de usuarios
@api.route('/login', methods=['POST'])
def login():
    try:

        data = request.json
        user = User.query.filter_by(is_active=data['is_active'], email=data['email']).first()

        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({'token': access_token, 'user_id':user.id}), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({
            "message": "An error occurred during login",
            "error": str(e)
        }), 500
    
@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    try:
        jti=get_jwt()["jti"]
        token_blocked=TokenBlockedList(jti=jti)
        db.session.add(token_blocked) 
        db.session.commit()
        
        return jsonify({"msg":"Session closed"}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while logging out",
            "error": str(e)
        }), 500
