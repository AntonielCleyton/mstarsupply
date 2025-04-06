# MStarSupply - Sistema de Controle de Supply Chain

Sistema desenvolvido para controle de mercadorias da empresa MStarSupply.
Permite cadastro de mercadorias, entrada e saída, visualização gráfica e exportação em PDF de relatórios.

![image](https://github.com/user-attachments/assets/6141c93c-0a29-4126-b788-6094525e8433)


---

## 📈 Tecnologias Utilizadas

- **Backend:** Python 3.13.1, Flask, SQLAlchemy, ReportLab
- **Frontend:** React.js, Recharts, Fetch API
- **Banco de Dados:** PostgreSQL

---

## 📂 Estrutura do Projeto

```
mstarsupply/
│
├── backend/                # Backend em Flask (API + relatórios PDF)
│   ├── app.py
│   ├── models.py
│   ├── relatorios.py
│   ├── ext.py
│   └── ...
│
├── frontend/               # Interface em React.js
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── ...
│
├── MStarSupply_Backup.sql  # Script de criação do banco PostgreSQL
├── README.md                # Documentação
└── .gitignore
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/AntonielCleyton/mstarsupply.git
cd mstarsupply
```

### 2. Backend (Flask)

> ⚠️ **Atenção:** delete a pasta `.venv` existente e crie uma nova no seu computador, pois o projeto foi desenvolvido com Python 3.13.1 e a sua versão pode ser diferente.

```bash
python -m venv venv
venv\Scripts\activate       # Windows
oU
source venv/bin/activate     # Linux/macOS

pip install flask flask_sqlalchemy psycopg2-binary reportlab

cd backend
python app.py
```

A API estará disponível em `http://127.0.0.1:5000`

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

A aplicação abrirá em `http://localhost:3000`

---

## 📄 Banco de Dados

Para recriar o banco de dados utilizado no projeto:

1. Acesse o pgAdmin ou seu gerenciador de PostgreSQL
2. Crie um banco chamado `mstarsupply`
3. Importe o arquivo `MStarSupply_Backup.sql`

---

## 🌟 Funcionalidades Atendidas

- Cadastro de mercadorias (nome, registro, fabricante, tipo, descrição)
- Cadastro de entrada e saída com data, quantidade, local e mercadoria (dropdown)
- Validações no frontend para todos os campos
- Gráfico por mês com entradas e saídas de cada mercadoria
- Exportação de relatório geral em PDF
- Exportação de relatório por período personalizado
- Relatório com detalhes de data, quantidade e local
- Tabela de saldo atual por mercadoria

---

## ➕ Funcionalidades Extras Implementadas

- Relatório por período personalizado
- Relatório de movimentação com gráfico
- Tabela de saldo atual de cada mercadoria (entradas, saídas, saldo)
- Interface responsiva e estilizada

---

## ✅ Contribuição
Pull requests são bem-vindos. Para maiores ideias ou sugestões, entre em contato!

