import React, { useState } from 'react';
import '../styles/GovernorForm.css';

function GovernorForm({ governor, onSubmit, onCancel }) {
  const [name, setName] = useState(governor?.name || '');
  const [vipLevel, setVipLevel] = useState(governor?.vipLevel || 0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ name: name.trim(), vipLevel });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{governor ? 'Edit Governor' : 'Add Governor'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Governor Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter governor name"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>VIP Level</label>
            <select value={vipLevel} onChange={(e) => setVipLevel(Number(e.target.value))}>
              {Array.from({ length: 19 }, (_, i) => (
                <option key={i} value={i}>
                  VIP {i}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GovernorForm;
