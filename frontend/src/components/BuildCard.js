import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BuildCard.css';

function BuildCard({ label, troopType, buildType, build, governorId, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (build) {
      navigate(`/governor/${governorId}/build/${build._id}?troopType=${troopType}&buildType=${buildType}`);
    } else {
      navigate(`/governor/${governorId}/build/new?troopType=${troopType}&buildType=${buildType}`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const getTroopTypeClass = () => {
    return `troop-${troopType}`;
  };

  return (
    <div className={`build-card ${getTroopTypeClass()} ${build ? 'has-build' : 'empty'}`} onClick={handleClick}>
      <div className="build-card-header">
        <h3>{label}</h3>
        {build && onDelete && (
          <button className="delete-btn" onClick={handleDelete} title="Delete">
            &times;
          </button>
        )}
      </div>

      {build ? (
        <div className="build-card-content">
          <div className="commanders">
            <div className="commander primary">
              <span className="commander-label">Primary:</span>
              <span className="commander-name">{build.primaryCommander || 'Not set'}</span>
            </div>
            <div className="commander secondary">
              <span className="commander-label">Secondary:</span>
              <span className="commander-name">{build.secondaryCommander || 'Not set'}</span>
            </div>
          </div>

          <div className="equipment-summary">
            {Object.entries(build.equipment || {}).filter(([_, eq]) => eq?.name).length}/7 Equipment
          </div>
        </div>
      ) : (
        <div className="build-card-empty">
          <span className="plus-icon">+</span>
          <span>Add Build</span>
        </div>
      )}
    </div>
  );
}

export default BuildCard;
