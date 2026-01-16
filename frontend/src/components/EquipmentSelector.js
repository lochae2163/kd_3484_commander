import React from 'react';
import '../styles/EquipmentSelector.css';

// 7 equipment slots as per the game
const SLOTS = [
  { key: 'WEAPON', label: 'Weapon', type: 'WEAPON' },
  { key: 'HELMET', label: 'Helmet', type: 'HELMET' },
  { key: 'CHEST', label: 'Chest Armor', type: 'CHEST' },
  { key: 'GLOVES', label: 'Gloves/Vambraces', type: 'GLOVES' },
  { key: 'LEGS', label: 'Leg Armor/Tassets', type: 'LEGS' },
  { key: 'BOOTS', label: 'Boots', type: 'BOOTS' },
  { key: 'ACCESSORY', label: 'Accessory', type: 'ACCESSORY' },
];

const ICONIC_LEVELS = ['I', 'II', 'III', 'IV', 'V'];

function EquipmentSelector({ equipment, allEquipment, onChange }) {
  // Filter equipment by type
  const getEquipmentByType = (type) => {
    return allEquipment.filter(eq => eq.type === type);
  };

  // Count set pieces
  const getSetCounts = () => {
    const counts = {};
    Object.values(equipment).forEach(piece => {
      if (piece.equipment_id) {
        const eq = allEquipment.find(e => e.equipment_id === piece.equipment_id);
        if (eq?.set_name) {
          counts[eq.set_name] = (counts[eq.set_name] || 0) + 1;
        }
      }
    });
    return counts;
  };

  const setCounts = getSetCounts();

  return (
    <div className="equipment-selector">
      {/* Set Bonus Tracker */}
      {Object.keys(setCounts).length > 0 && (
        <div className="set-bonus-tracker">
          <h4>Set Bonuses</h4>
          <div className="set-counts">
            {Object.entries(setCounts).map(([setName, count]) => (
              <div key={setName} className={`set-count ${count >= 6 ? 'full' : count >= 4 ? 'high' : count >= 2 ? 'active' : ''}`}>
                <span className="set-name">{setName}</span>
                <span className="count-badge">{count}/6</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment Slots */}
      {SLOTS.map(slot => {
        const currentPiece = equipment[slot.key];
        const availableEquipment = getEquipmentByType(slot.type);
        const selectedEquipment = allEquipment.find(e => e.equipment_id === currentPiece?.equipment_id);

        return (
          <div key={slot.key} className="equipment-slot">
            <label className="slot-label">
              {slot.label}
              {selectedEquipment?.set_name && (
                <span className="set-indicator" title={selectedEquipment.set_name}>
                  ({selectedEquipment.set_name.split(' ').map(w => w[0]).join('')})
                </span>
              )}
            </label>

            <div className="slot-controls">
              <select
                className="equipment-select"
                value={currentPiece?.equipment_id || ''}
                onChange={(e) => onChange(slot.key, 'equipment_id', e.target.value)}
              >
                <option value="">-- Select {slot.label} --</option>
                {availableEquipment.map(eq => (
                  <option key={eq.equipment_id} value={eq.equipment_id}>
                    {eq.name} {eq.set_name ? `[${eq.set_name.split(' ').map(w => w[0]).join('')}]` : ''}
                  </option>
                ))}
              </select>

              <select
                className="iconic-select"
                value={currentPiece?.iconic_level || 'V'}
                onChange={(e) => onChange(slot.key, 'iconic_level', e.target.value)}
              >
                {ICONIC_LEVELS.map(level => (
                  <option key={level} value={level}>Iconic {level}</option>
                ))}
              </select>

              <label className="st-checkbox" title="Special Talent (+30% Iconic stats when matching commander's red talent tree)">
                <input
                  type="checkbox"
                  checked={currentPiece?.special_talent || false}
                  onChange={(e) => onChange(slot.key, 'special_talent', e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="st-label">ST</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EquipmentSelector;
