import React, { useState, useMemo } from 'react';
import { equipmentData, QUALITY_COLORS, QUALITY_ORDER } from '../data/equipmentData';
import '../styles/EquipmentBrowser.css';

const SLOT_TYPES = [
  { value: '', label: 'All Slots' },
  { value: 'WEAPON', label: 'Weapon' },
  { value: 'HELMET', label: 'Helmet' },
  { value: 'CHEST', label: 'Chest' },
  { value: 'GLOVES', label: 'Gloves' },
  { value: 'LEGS', label: 'Legs' },
  { value: 'BOOTS', label: 'Boots' },
  { value: 'ACCESSORY', label: 'Accessory' }
];

const QUALITY_TYPES = [
  { value: '', label: 'All Quality' },
  { value: 'legendary', label: 'Legendary' },
  { value: 'epic', label: 'Epic' },
  { value: 'elite', label: 'Elite' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'normal', label: 'Normal' }
];

// Stat display names
const STAT_NAMES = {
  cavalryAttack: 'Cavalry Attack',
  cavalryDefense: 'Cavalry Defense',
  cavalryHealth: 'Cavalry Health',
  cavalryMarchSpeed: 'Cavalry March Speed',
  infantryAttack: 'Infantry Attack',
  infantryDefense: 'Infantry Defense',
  infantryHealth: 'Infantry Health',
  infantryMarchSpeed: 'Infantry March Speed',
  archerAttack: 'Archer Attack',
  archerDefense: 'Archer Defense',
  archerHealth: 'Archer Health',
  archerMarchSpeed: 'Archer March Speed',
  siegeAttack: 'Siege Attack',
  siegeDefense: 'Siege Defense',
  siegeHealth: 'Siege Health',
  siegeMarchSpeed: 'Siege March Speed',
  troopAttack: 'Troop Attack',
  troopDefense: 'Troop Defense',
  troopHealth: 'Troop Health',
  troopMarchSpeed: 'Troop March Speed'
};

// Stat categories for color coding
const STAT_COLORS = {
  Attack: '#ff6b6b',
  Defense: '#60a5fa',
  Health: '#4ade80',
  MarchSpeed: '#fbbf24'
};

function EquipmentBrowser() {
  const [slotFilter, setSlotFilter] = useState('');
  const [qualityFilter, setQualityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return equipmentData
      .filter(eq => {
        if (slotFilter && eq.type !== slotFilter) return false;
        if (qualityFilter && eq.quality !== qualityFilter) return false;
        if (searchTerm && !eq.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        // Sort by quality first, then by name
        const qualityDiff = QUALITY_ORDER.indexOf(a.quality) - QUALITY_ORDER.indexOf(b.quality);
        if (qualityDiff !== 0) return qualityDiff;
        return a.name.localeCompare(b.name);
      });
  }, [slotFilter, qualityFilter, searchTerm]);

  // Group by slot type
  const groupedBySlot = useMemo(() => {
    const groups = {};
    const slotOrder = ['WEAPON', 'HELMET', 'CHEST', 'GLOVES', 'LEGS', 'BOOTS', 'ACCESSORY'];

    slotOrder.forEach(slot => {
      const items = filteredEquipment.filter(eq => eq.type === slot);
      if (items.length > 0) {
        groups[slot] = items;
      }
    });

    return groups;
  }, [filteredEquipment]);

  return (
    <div className="equipment-browser">
      <div className="browser-header">
        <h1>Equipment Database</h1>
        <p className="subtitle">Browse all ROK equipment with complete stats for calculations</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Slot Type</label>
          <select value={slotFilter} onChange={(e) => setSlotFilter(e.target.value)}>
            {SLOT_TYPES.map(st => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Quality</label>
          <select value={qualityFilter} onChange={(e) => setQualityFilter(e.target.value)}>
            {QUALITY_TYPES.map(qt => (
              <option key={qt.value} value={qt.value}>{qt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredEquipment.length} equipment items
      </div>

      {slotFilter ? (
        // Single slot view - grid layout
        <div className="equipment-grid">
          {filteredEquipment.map(eq => (
            <EquipmentCard key={eq.id} equipment={eq} />
          ))}
        </div>
      ) : (
        // Grouped by slot view
        Object.entries(groupedBySlot).map(([slotType, items]) => (
          <div key={slotType} className="slot-section">
            <h2 className="slot-header">
              {slotType.charAt(0) + slotType.slice(1).toLowerCase()}
              <span className="item-count">({items.length})</span>
            </h2>
            <div className="equipment-grid">
              {items.map(eq => (
                <EquipmentCard key={eq.id} equipment={eq} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function EquipmentCard({ equipment }) {
  const { name, image, quality, materials, stats, specialStats, goldCost } = equipment;
  const qualityColor = QUALITY_COLORS[quality];

  // Get stat color based on type
  const getStatColor = (statKey) => {
    if (statKey.includes('Attack')) return STAT_COLORS.Attack;
    if (statKey.includes('Defense')) return STAT_COLORS.Defense;
    if (statKey.includes('Health')) return STAT_COLORS.Health;
    if (statKey.includes('MarchSpeed')) return STAT_COLORS.MarchSpeed;
    return '#6bcb77';
  };

  // Get non-zero stat entries
  const statEntries = Object.entries(stats || {}).filter(([_, value]) => value > 0);

  // Format gold cost
  const formatGold = (gold) => {
    if (gold >= 1000000) return `${(gold / 1000000).toFixed(0)}M`;
    if (gold >= 1000) return `${(gold / 1000).toFixed(0)}K`;
    return gold.toString();
  };

  return (
    <div className="equipment-card" style={{ borderColor: qualityColor }}>
      <div className="card-image-section">
        <img
          src={image}
          alt={name}
          className="equipment-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="equipment-name" style={{ color: qualityColor }}>{name}</h3>

        <div className="quality-badge" style={{ backgroundColor: qualityColor }}>
          {quality.charAt(0).toUpperCase() + quality.slice(1)}
        </div>

        {/* Materials */}
        <div className="materials-section">
          {materials.leather > 0 && (
            <span className="material leather">
              <span className="material-icon">🟤</span> {materials.leather}
            </span>
          )}
          {materials.iron > 0 && (
            <span className="material iron">
              <span className="material-icon">⚫</span> {materials.iron}
            </span>
          )}
          {materials.ebony > 0 && (
            <span className="material ebony">
              <span className="material-icon">🟣</span> {materials.ebony}
            </span>
          )}
          {materials.bone > 0 && (
            <span className="material bone">
              <span className="material-icon">🦴</span> {materials.bone}
            </span>
          )}
          {goldCost > 0 && (
            <span className="material gold">
              <span className="material-icon">💰</span> {formatGold(goldCost)}
            </span>
          )}
        </div>

        {/* Stats */}
        {statEntries.length > 0 && (
          <div className="stats-section">
            {statEntries.map(([key, value]) => (
              <div key={key} className="stat-row">
                <span className="stat-name">{STAT_NAMES[key] || key}</span>
                <span className="stat-value" style={{ color: getStatColor(key) }}>
                  +{value}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Special abilities */}
        {specialStats && specialStats.length > 0 && (
          <div className="special-section">
            {specialStats.map((special, idx) => (
              <span key={idx} className="special-text">{special}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EquipmentBrowser;
