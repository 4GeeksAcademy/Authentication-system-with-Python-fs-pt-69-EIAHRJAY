from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask

bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120), nullable=False, unique=True)
    

    def __repr__(self):
     return f'<TokenBlocked {self.jti}>'