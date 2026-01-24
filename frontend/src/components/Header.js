import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1>3584 Rally/Garrison Data Keeper</h1>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
