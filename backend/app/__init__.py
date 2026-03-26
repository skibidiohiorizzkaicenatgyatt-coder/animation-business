from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from app.config import Config

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    mail.init_app(app)

    from app.routes.contato import contato_bp
    app.register_blueprint(contato_bp)

    return app