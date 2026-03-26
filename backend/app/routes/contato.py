from flask import Blueprint, request, jsonify
from flask_mail import Message
from app import mail
import os

contato_bp = Blueprint("contato", __name__)

@contato_bp.route("/api/contato", methods=["POST"])
def contato():
    data = request.get_json()

    nome     = data.get("nome", "").strip()
    email    = data.get("email", "").strip()
    mensagem = data.get("mensagem", "").strip()

    if not nome or not email or not mensagem:
        return jsonify({ "ok": False, "erro": "Preencha todos os campos." }), 400

    msg = Message(
        subject  = f"[Fábula] Contato de {nome}",
        sender   = os.getenv("MAIL_USERNAME"),
        recipients = [os.getenv("MAIL_USERNAME")],  # recebe no próprio email
        reply_to = email,
        body     = f"Nome: {nome}\nEmail: {email}\n\n{mensagem}"
    )

    mail.send(msg)

    return jsonify({ "ok": True, "mensagem": "Email enviado com sucesso!" })