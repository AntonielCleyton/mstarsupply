import React, { useState } from 'react';
import './index.css';

function CadastroMercadoria() {
  const [nome, setNome] = useState('');
  const [numeroRegistro, setNumeroRegistro] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erros, setErros] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!numeroRegistro.trim()) novosErros.numeroRegistro = "Número de registro é obrigatório";
    if (!fabricante.trim()) novosErros.fabricante = "Fabricante é obrigatório";
    if (!tipo.trim()) novosErros.tipo = "Tipo é obrigatório";
    if (numeroRegistro.length < 4) novosErros.numeroRegistro = "Número de registro deve ter pelo menos 4 caracteres";
  
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return; 
    }
  
    setErros({});
  
    fetch('http://localhost:5000/mercadorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, numero_registro: numeroRegistro, fabricante, tipo, descricao })
    })
      .then(response => {
        if (response.ok) {
          alert('Mercadoria cadastrada com sucesso!');
          setNome('');
          setNumeroRegistro('');
          setFabricante('');
          setTipo('');
          setDescricao('');
        } else {
          alert('Erro ao cadastrar a mercadoria.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Erro na conexão com o servidor.');
      });
  };
  

  return (
    <div className="form-container">
      <h2>Cadastro de Mercadoria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          {erros.nome && <p style={{ color: 'red' }}>{erros.nome}</p>}
        </div>
        <div>
          <label>Número de Registro:</label>
          <input type="text" value={numeroRegistro} onChange={(e) => setNumeroRegistro(e.target.value)} />
          {erros.numeroRegistro && <p style={{ color: 'red' }}>{erros.numeroRegistro}</p>}
        </div>
        <div>
          <label>Fabricante:</label>
          <input type="text" value={fabricante} onChange={(e) => setFabricante(e.target.value)} />
          {erros.fabricante && <p style={{ color: 'red' }}>{erros.fabricante}</p>}
        </div>
        <div>
          <label>Tipo:</label>
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
          {erros.tipo && <p style={{ color: 'red' }}>{erros.tipo}</p>}
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroMercadoria;
