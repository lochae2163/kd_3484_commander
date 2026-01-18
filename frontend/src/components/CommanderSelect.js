import React from 'react';
import '../styles/CommanderSelect.css';

function CommanderSelect({ label, commanders, value, onChange, filterRole, buildType }) {
  // Filter commanders based on their roles
  const filteredCommanders = commanders.filter((cmd) => {
    // For primary commanders, show those with rally/garrison role matching buildType
    if (filterRole === 'primary') {
      return cmd.roles.includes(buildType);
    }
    // For secondary, show all commanders with 'secondary' role or the buildType role
    if (filterRole === 'secondary') {
      return cmd.roles.includes('secondary') || cmd.roles.includes(buildType);
    }
    return true;
  });

  return (
    <div className="commander-select">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Select Commander --</option>
        {filteredCommanders.map((cmd) => (
          <option key={cmd.commanderId} value={cmd.name}>
            {cmd.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CommanderSelect;
