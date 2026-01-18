import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GovernorDetail from './pages/GovernorDetail';
import BuildForm from './pages/BuildForm';
import Header from './components/Header';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Header onLogout={handleLogout} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/governor/:id" element={<GovernorDetail />} />
            <Route path="/governor/:id/build/new" element={<BuildForm />} />
            <Route path="/governor/:id/build/:buildId" element={<BuildForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>ROK Data Keeper - Alliance Build Tracker</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
