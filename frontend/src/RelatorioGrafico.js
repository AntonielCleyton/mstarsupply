import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import './index.css';

function RelatorioGrafico() {
  const [mercadorias, setMercadorias] = useState([]);
  const [mercadoriaId, setMercadoriaId] = useState('');
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [saldos, setSaldos] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/mercadorias')
      .then(res => res.json())
      .then(data => setMercadorias(data))
      .catch(() => alert("Erro ao carregar mercadorias"));

    // Buscar saldos
    fetch('http://127.0.0.1:5000/saldo-mercadorias')
      .then(res => res.json())
      .then(data => setSaldos(data))
      .catch(() => alert("Erro ao carregar saldos"));
  }, []);

  useEffect(() => {
    if (mercadoriaId) {
      fetch(`http://127.0.0.1:5000/relatorio-mensal/${mercadoriaId}`)
        .then(res => res.json())
        .then(data => setDados(data))
        .catch(() => alert("Erro ao buscar dados do gráfico"));
    }
  }, [mercadoriaId]);

  const handleDownload = () => {
    fetch("http://127.0.0.1:5000/relatorio-pdf")
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "relatorio_geral.pdf";
        a.click();
      })
      .catch(() => alert("Erro ao baixar o relatório em PDF."));
  };

  const handleExportarPeriodo = () => {
    if (!dataInicio || !dataFim) {
      alert("Preencha as datas de início e fim.");
      return;
    }

    const url = `http://127.0.0.1:5000/relatorio-periodo?inicio=${dataInicio}&fim=${dataFim}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relatorio-container">
      <h2>
        {mercadoriaId
          ? `Relatório Gráfico - ${mercadorias.find(m => m.id == mercadoriaId)?.nome || ''}`
          : "Relatório Gráfico de Movimentações"}
      </h2>

      <select value={mercadoriaId} onChange={(e) => setMercadoriaId(e.target.value)}>
        <option value="">Selecione a Mercadoria</option>
        {mercadorias.map(m => (
          <option key={m.id} value={m.id}>{m.nome}</option>
        ))}
      </select>

      {dados.length > 0 && (
        <BarChart width={600} height={300} data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#82ca9d" />
          <Bar dataKey="saidas" fill="#8884d8" />
        </BarChart>
      )}

      <button onClick={handleDownload} style={{ marginTop: '30px' }}>
        Exportar Relatório Geral (PDF)
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ textAlign: 'center' }}>Exportar por Período</h3>
        <div style={{ textAlign: 'center' }}>
          <label>Data Início:</label>
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          <label style={{ marginLeft: '10px' }}>Data Fim:</label>
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>
        <button onClick={handleExportarPeriodo} style={{ display: 'block', margin: '10px auto' }}>
          Exportar Relatório por Período (PDF)
        </button>
      </div>

      {/* TABELA DE SALDOS */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ textAlign: 'center' }}>Saldo Atual por Mercadoria</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Mercadoria</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Entradas</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Saídas</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {saldos.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{s.nome}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{s.entradas}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{s.saidas}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{s.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RelatorioGrafico;
