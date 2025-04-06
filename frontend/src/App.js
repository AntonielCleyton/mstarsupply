import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CadastroMercadoria from './CadastroMercadoria';
import CadastroEntrada from './CadastroEntrada';
import CadastroSaida from './CadastroSaida';
import RelatorioGrafico from './RelatorioGrafico';
import './index.css'; 

function App() {
  return (
    <Router>
      <nav className="menu-superior">
        <ul className="menu-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Mercadorias</NavLink></li>
          <li><NavLink to="/entradas" className={({ isActive }) => isActive ? 'active' : ''}>Entradas</NavLink></li>
          <li><NavLink to="/saidas" className={({ isActive }) => isActive ? 'active' : ''}>Saídas</NavLink></li>
          <li><NavLink to="/relatorios" className={({ isActive }) => isActive ? 'active' : ''}>Relatório</NavLink></li>
        </ul>
      </nav>

      <div className="conteudo-principal">
        <Routes>
          <Route path="/" element={<CadastroMercadoria />} />
          <Route path="/entradas" element={<CadastroEntrada />} />
          <Route path="/saidas" element={<CadastroSaida />} />
          <Route path="/relatorios" element={<RelatorioGrafico />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
