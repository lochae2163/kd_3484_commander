import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1>ROK Data Keeper</h1>
          <span className="subtitle">Alliance Build Tracker</span>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
