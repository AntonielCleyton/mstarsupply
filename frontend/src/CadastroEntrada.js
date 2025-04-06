import React, { useState, useEffect } from 'react';
import './index.css';

function CadastroEntrada() {

    const [quantidade, setQuantidade] = useState('');
    const [dataHora, setDataHora] = useState('');
    const [local, setLocal] = useState('');
    const [mercadoriaId, setMercadoriaId] = useState('');
    const [mercadorias, setMercadorias] = useState([]);
    const [erros, setErros] = useState({});
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/mercadorias')
          .then((res) => res.json())
          .then((data) => setMercadorias(data))
          .catch((error) => {
            console.error('Erro ao buscar mercadorias:', error);
            alert('Erro ao carregar mercadorias.');
          });
      }, []);

      function handleSubmit(e) {
        e.preventDefault();
      
        const novosErros = {};
        if (!quantidade || quantidade <= 0) novosErros.quantidade = "Quantidade deve ser maior que 0";
        if (!dataHora.trim()) novosErros.data_hora = "Data e hora são obrigatórios";
        if (!local.trim()) novosErros.local = "Local é obrigatório";
        if (!mercadoriaId.trim()) novosErros.mercadoria_id = "Você precisa selecionar uma mercadoria";
      
        if (Object.keys(novosErros).length > 0) {
          setErros(novosErros);
          return;
        }
      
        setErros({}); 
      
        const dados = {
          mercadoria_id: mercadoriaId,
          quantidade: quantidade,
          data_hora: dataHora,
          local: local,
        };
      
        fetch("http://127.0.0.1:5000/entradas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Erro ao cadastrar a entrada.");
            }
            return res.json();
          })
          .then(() => {
            alert("Entrada cadastrada com sucesso!");
            setQuantidade("");
            setDataHora("");
            setLocal("");
            setMercadoriaId("");
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao cadastrar a entrada.");
          });
      }
      
    return (
    <div className="form-container">
        <h2>Cadastro de Entrada</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Quantidade:</label>
            <input
            type="number"
            name="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            />
            {erros.quantidade && <p style={{ color: 'red' }}>{erros.quantidade}</p>}
        </div>

        <div>
            <label>Data e Hora:</label>
            <input
            type="datetime-local"
            name="data_hora"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            />
            {erros.data_hora && <p style={{ color: 'red' }}>{erros.data_hora}</p>}
        </div>

        <div>
            <label>Local:</label>
            <input
            type="text"
            name="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            />
            {erros.local && <p style={{ color: 'red' }}>{erros.local}</p>}
        </div>

        <div>
            <label>Mercadoria:</label>
            <select
            name="mercadoria_id"
            value={mercadoriaId}
            onChange={(e) => setMercadoriaId(e.target.value)}
            >
            <option value="">Selecione</option>
            {mercadorias.map((m) => (
                <option key={m.id} value={m.id}>
                {m.nome}
                </option>
            ))}
            </select>
            {erros.mercadoria_id && <p style={{ color: 'red' }}>{erros.mercadoria_id}</p>}
        </div>
        <button type="submit">Cadastrar Entrada</button>
        </form>
    </div>
    );
}


export default CadastroEntrada;
