from flask_cors import CORS
from flask import request, jsonify
from ext import db
from models import Mercadoria, Entrada, Saida
from sqlalchemy import extract, func
from criar_app import criar_app
from relatorios import gerar_pdf
from relatorios import gerar_pdf_periodo
from relatorios import calcular_saldo_mercadorias
from datetime import datetime


app = criar_app()
CORS(app)
    
@app.route("/")
def home():
    return "API MStarSupply funcionando!"

@app.route('/mercadorias', methods=['POST'])
def cadastrar_mercadoria():
    dados = request.get_json()
    nome = dados.get('nome')
    numero_registro = dados.get('numero_registro')
    fabricante = dados.get('fabricante')
    tipo = dados.get('tipo')
    descricao = dados.get('descricao')

    if not nome or not numero_registro or not fabricante or not tipo:
        return jsonify({'erro': 'Campos obrigatórios estão faltando.'}), 400

    nova_mercadoria = Mercadoria(
        nome=nome,
        numero_registro=numero_registro,
        fabricante=fabricante,
        tipo=tipo,
        descricao=descricao
    )

    db.session.add(nova_mercadoria)
    db.session.commit()

    return jsonify({'mensagem': 'Mercadoria cadastrada com sucesso!'}), 201

@app.route('/mercadorias', methods=['GET'])
def listar_mercadorias():
    mercadorias = Mercadoria.query.all()
    resultado = []
    for m in mercadorias:
        resultado.append({
            'id': m.id,
            'nome': m.nome,
            'numero_registro': m.numero_registro,
            'fabricante': m.tipo,
            'descricao': m.descricao
        })

    return jsonify(resultado), 200

@app.route('/entradas', methods=['POST'])
def registrar_entrada():
    dados = request.get_json()
    mercadoria_id = dados.get('mercadoria_id')
    quantidade = dados.get('quantidade')
    data_hora_str = dados.get('data_hora')
    local = dados.get('local')

    if not mercadoria_id or not quantidade or not data_hora_str or not local:
        return jsonify({'erro': 'Todos os campos são obrigatórios'}), 400
    
    try:
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')
    except ValueError:
        return jsonify({'erro': 'Formato de data/hora inválido. Use YYYY-MM-DD HH:MM'}), 400

    mercadoria = Mercadoria.query.get(mercadoria_id)
    if not mercadoria:
        return jsonify({'erro': 'Mercadoria não encontrada'}), 404
    
    nova_entrada = Entrada(
        mercadoria_id=mercadoria_id,
        quantidade=quantidade,
        data_hora=data_hora,
        local=local
    )

    db.session.add(nova_entrada)
    db.session.commit()

    return jsonify({'mensagem': 'Entrada registrada com sucesso!'}), 201

@app.route('/saidas', methods=['POST'])
def registrar_saida():
    dados = request.get_json()

    mercadoria_id = dados.get('mercadoria_id')
    quantidade = dados.get('quantidade')
    data_hora_str = dados.get('data_hora')
    local = dados.get('local')

    if not mercadoria_id or not quantidade or not data_hora_str or not local:
        return jsonify({'erro': 'Todos os campos são obrigatórios'}), 400

    try:
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')
    except ValueError:
        return jsonify({'erro': 'Formato de data/hora inválido. Use YYYY-MM-DD HH:MM'}), 400

    mercadoria = Mercadoria.query.get(mercadoria_id)
    if not mercadoria:
        return jsonify({'erro': 'Mercadoria não encontrada'}), 404

    nova_saida = Saida(
        mercadoria_id=mercadoria_id,
        quantidade=quantidade,
        data_hora=data_hora,
        local=local
    )

    db.session.add(nova_saida)
    db.session.commit()

    return jsonify({'mensagem': 'Saída registrada com sucesso!'}), 201

@app.route('/relatorio-mensal/<int:mercadoria_id>', methods=['GET'])
def relatorio_mensal(mercadoria_id):
    entradas = db.session.query(
        extract('year', Entrada.data_hora).label('ano'),
        extract('month', Entrada.data_hora).label('mes'),
        func.sum(Entrada.quantidade).label('total_entradas')
    ).filter_by(mercadoria_id=mercadoria_id
    ).group_by('ano', 'mes'
    ).order_by('ano', 'mes').all()

    saidas = db.session.query(
        extract('year', Saida.data_hora).label('ano'),
        extract('month', Saida.data_hora).label('mes'),
        func.sum(Saida.quantidade).label('total_saidas')
    ).filter_by(mercadoria_id=mercadoria_id
    ).group_by('ano', 'mes'
    ).order_by('ano', 'mes').all()

    resultado = {}

    for e in entradas:
        chave = f"{int(e.ano):04d}-{int(e.mes):02d}"
        resultado[chave] = {'entradas': int(e.total_entradas), 'saidas': 0}
    for s in saidas:
        chave = f"{int(s.ano):04d}-{int(s.mes):02d}"
        if chave not in resultado:
            resultado[chave] = {'entradas': 0, 'saidas': 0}
        resultado[chave]['saidas'] = int(s.total_saidas)
    resposta = []
    for mes in sorted(resultado.keys()):
        resposta.append({
            'mes': mes,
            'entradas': resultado[mes]['entradas'],
            'saidas': resultado[mes]['saidas']
        })
    return jsonify(resposta), 200

@app.route('/relatorio-pdf')
def retlatorio_pdf():
    return gerar_pdf()

@app.route('/relatorio-periodo')
def relatorio_por_periodo():
    inicio = request.args.get('inicio')
    fim = request.args.get('fim')

    if not inicio or not fim:
        return {'erro': 'As datas de início e fim são obrigatórias'}, 400

    return gerar_pdf_periodo(inicio, fim)

@app.route('/saldo-mercadorias')
def saldo_mercadorias():
    return calcular_saldo_mercadorias()
    return jsonify(resultado)

if __name__=='__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)