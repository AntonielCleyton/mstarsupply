from ext import db

class Mercadoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String, nullable=False)
    numero_registro = db.Column(db.String, nullable=False, unique=True)
    fabricante = db.Column(db.String, nullable=False)
    tipo = db.Column(db.String, nullable=False)
    descricao = db.Column(db.String)

class Entrada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadoria.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    local = db.Column(db.String, nullable=False)

class Saida(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadoria.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    local = db.Column(db.String, nullable=False)