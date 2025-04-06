from flask import current_app, send_file
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from models import Mercadoria, Entrada, Saida
from ext import db
from flask import jsonify
from datetime import datetime

def gerar_pdf():
    with current_app.app_context():
        buffer = BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)

        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(2 * cm, 28 * cm, "Relatório Geral de Entradas e Saídas por Mercadoria")


        y = 26.5 * cm
        pdf.setFont("Helvetica", 11)

        mercadorias = Mercadoria.query.all()

        for mercadoria in mercadorias:
            if y < 4 * cm:  
                pdf.showPage()
                y = 28 * cm
                pdf.setFont("Helvetica", 11)

            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(2 * cm, y, f"{mercadoria.nome} - {mercadoria.numero_registro}")
            y -= 0.7 * cm

            entradas = Entrada.query.filter_by(mercadoria_id=mercadoria.id).order_by(Entrada.data_hora).all()
            if entradas:
                pdf.setFont("Helvetica-Bold", 11)
                pdf.drawString(2.3 * cm, y, "Entradas:")
                y -= 0.5 * cm

                pdf.setFont("Helvetica", 10)
                for entrada in entradas:
                    texto = f"- {entrada.quantidade} un. em {entrada.data_hora.strftime('%d/%m/%Y %H:%M')} no local: {entrada.local}"
                    pdf.drawString(2.7 * cm, y, texto)
                    y -= 0.5 * cm
                    if y < 4 * cm:
                        pdf.showPage()
                        y = 28 * cm
                        pdf.setFont("Helvetica", 10)

            saidas = Saida.query.filter_by(mercadoria_id=mercadoria.id).order_by(Saida.data_hora).all()
            if saidas:
                pdf.setFont("Helvetica-Bold", 11)
                pdf.drawString(2.3 * cm, y, "Saídas:")
                y -= 0.5 * cm

                pdf.setFont("Helvetica", 10)
                for saida in saidas:
                    texto = f"- {saida.quantidade} un. em {saida.data_hora.strftime('%d/%m/%Y %H:%M')} no local: {saida.local}"
                    pdf.drawString(2.7 * cm, y, texto)
                    y -= 0.5 * cm
                    if y < 4 * cm:
                        pdf.showPage()
                        y = 28 * cm
                        pdf.setFont("Helvetica", 10)

            y -= 0.8 * cm 

        pdf.save()
        buffer.seek(0)
        return send_file(buffer, as_attachment=True, download_name="relatorio.pdf", mimetype="application/pdf")

def gerar_pdf_periodo(inicio, fim):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    estilo = getSampleStyleSheet()["Normal"]

    conteudo = []

    data_inicio = datetime.strptime(inicio, "%Y-%m-%d")
    data_fim = datetime.strptime(fim, "%Y-%m-%d")
    titulo = f"<b>Relatório de Entradas e Saídas de {data_inicio.strftime('%d/%m/%Y')} até {data_fim.strftime('%d/%m/%Y')}</b>"

    conteudo.append(Paragraph(titulo, estilo))
    conteudo.append(Spacer(1, 12))

    mercadorias = Mercadoria.query.all()

    for mercadoria in mercadorias:
        entradas = Entrada.query.filter(
            Entrada.mercadoria_id == mercadoria.id,
            Entrada.data_hora >= data_inicio,
            Entrada.data_hora <= data_fim
        ).all()

        saidas = Saida.query.filter(
            Saida.mercadoria_id == mercadoria.id,
            Saida.data_hora >= data_inicio,
            Saida.data_hora <= data_fim
        ).all()

        if entradas or saidas:
            conteudo.append(Paragraph(f"<b>{mercadoria.nome} - {mercadoria.numero_registro}</b>", estilo))

            if entradas:
                conteudo.append(Paragraph("Entradas:", estilo))
                for e in entradas:
                    texto = f"- {e.quantidade} un. em {e.data_hora.strftime('%d/%m/%Y %H:%M')} no local: {e.local}"
                    conteudo.append(Paragraph(texto, estilo))

            if saidas:
                conteudo.append(Paragraph("Saídas:", estilo))
                for s in saidas:
                    texto = f"- {s.quantidade} un. em {s.data_hora.strftime('%d/%m/%Y %H:%M')} no local: {s.local}"
                    conteudo.append(Paragraph(texto, estilo))

            conteudo.append(Spacer(1, 12))

    doc.build(conteudo)
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="relatorio_periodo.pdf", mimetype="application/pdf")

def calcular_saldo_mercadorias():
    resultado = []

    mercadorias = Mercadoria.query.all()

    for m in mercadorias:
        entradas = db.session.query(db.func.sum(Entrada.quantidade)).filter_by(mercadoria_id=m.id).scalar() or 0
        saidas = db.session.query(db.func.sum(Saida.quantidade)).filter_by(mercadoria_id=m.id).scalar() or 0
        saldo = entradas - saidas

        resultado.append({
            "id": m.id,
            "nome": m.nome,
            "entradas": entradas,
            "saidas": saidas,
            "saldo": saldo
        })

    return jsonify(resultado)