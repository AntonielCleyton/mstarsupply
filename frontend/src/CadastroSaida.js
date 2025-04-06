import React, { useState, useEffect } from 'react';
import './index.css';

function CadastroSaida() {

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
          .catch(() => alert("Erro ao carregar mercadorias."));
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
      
        fetch("http://127.0.0.1:5000/saidas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(() => {
            alert("Saída cadastrada com sucesso!");
            setQuantidade('');
            setDataHora('');
            setLocal('');
            setMercadoriaId('');
          })
          .catch(() => alert("Erro ao cadastrar a saída."));
      }      
      
      return (
        <div className="form-container">
          <h2>Cadastro de Saída</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Quantidade:</label>
              <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              {erros.quantidade && <p style={{ color: 'red' }}>{erros.quantidade}</p>}
            </div>
            <div>
              <label>Data e Hora:</label>
              <input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} />
              {erros.data_hora && <p style={{ color: 'red' }}>{erros.data_hora}</p>}
            </div>
            <div>
              <label>Local:</label>
              <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
              {erros.local && <p style={{ color: 'red' }}>{erros.local}</p>}
            </div>
            <div>
              <label>Mercadoria:</label>
              <select value={mercadoriaId} onChange={(e) => setMercadoriaId(e.target.value)}>
                <option value="">Selecione</option>
                {mercadorias.map((m) => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
              {erros.mercadoria_id && <p style={{ color: 'red' }}>{erros.mercadoria_id}</p>}
            </div>
            <button type="submit">Cadastrar Saída</button>
          </form>
        </div>
      );
    }
    

export default CadastroSaida;

