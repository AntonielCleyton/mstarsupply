from flask_cors import CORS
from flask import Flask
from ext import db
from models import Mercadoria, Entrada, Saida

def criar_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:star123@localhost/mstarsupply'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app
