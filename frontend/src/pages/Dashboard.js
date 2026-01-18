import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { governorService } from '../services/api';
import GovernorCard from '../components/GovernorCard';
import GovernorForm from '../components/GovernorForm';
import '../styles/Dashboard.css';

function Dashboard() {
  const [governors, setGovernors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGovernors();
  }, []);

  const loadGovernors = async () => {
    try {
      setLoading(true);
      const response = await governorService.getAll();
      setGovernors(response.data.governors || []);
    } catch (err) {
      setError('Failed to load governors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGovernor = async (data) => {
    try {
      await governorService.create(data);
      setShowForm(false);
      loadGovernors();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteGovernor = async (id) => {
    if (!window.confirm('Delete this governor and all their builds?')) return;

    try {
      await governorService.delete(id);
      loadGovernors();
    } catch (err) {
      setError('Failed to delete governor');
    }
  };

  const filteredGovernors = governors.filter((gov) =>
    gov.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Governors</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add Governor
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search governors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="governors-grid">
          {filteredGovernors.length === 0 ? (
            <div className="no-results">
              {search ? 'No governors found' : 'No governors yet. Add one to get started!'}
            </div>
          ) : (
            filteredGovernors.map((governor) => (
              <GovernorCard
                key={governor._id}
                governor={governor}
                onClick={() => navigate(`/governor/${governor._id}`)}
                onDelete={() => handleDeleteGovernor(governor._id)}
              />
            ))
          )}
        </div>
      )}

      {showForm && (
        <GovernorForm
          onSubmit={handleCreateGovernor}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
