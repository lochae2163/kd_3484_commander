import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { governorService, buildService, dataService, uploadService } from '../services/api';
import CommanderSelect from '../components/CommanderSelect';
import EquipmentSlot from '../components/EquipmentSlot';
import { calculateEquipmentStats, countSetPieces, getActiveSetBonuses, formatStat, calculateArmamentStats, calculateTotalStats } from '../utils/statsCalculator';
import { TIER_COLORS, INSCRIPTION_DESCRIPTIONS } from '../data/inscriptionData';
import '../styles/BuildForm.css';

const EQUIPMENT_SLOTS = ['weapon', 'helmet', 'chest', 'gloves', 'legs', 'boots', 'accessory1', 'accessory2'];
const ARMAMENT_SLOTS = ['scroll', 'instrument', 'emblem', 'flag'];
const TIER_ORDER = ['S', 'A', 'B', 'C'];

function BuildForm() {
  const { id, buildId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const troopType = searchParams.get('troopType');
  const buildType = searchParams.get('buildType');

  const [governor, setGovernor] = useState(null);
  const [commanders, setCommanders] = useState([]);  // Filtered by troopType for primary
  const [allCommanders, setAllCommanders] = useState([]);  // All commanders for secondary
  const [armaments, setArmaments] = useState([]);
  const [allInscriptions, setAllInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    primaryCommander: '',
    secondaryCommander: '',
    equipment: {
      weapon: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      helmet: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      chest: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      gloves: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      legs: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      boots: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      accessory1: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
      accessory2: { id: null, name: null, iconicLevel: 1, hasSpecialTalent: false },
    },
    armament: {
      formation: null,
      emblem: { inscriptions: [] },
      flag: { inscriptions: [] },
      instrument: { inscriptions: [] },
      scroll: { inscriptions: [] },
    },
    manualStats: {
      attack: 0,
      defense: 0,
      health: 0,
      marchSpeed: 0,
      allDamage: 0,
    },
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, buildId, troopType]);

  // Set page title
  useEffect(() => {
    const action = buildId ? 'Edit' : 'Create';
    const tt = troopType ? troopType.charAt(0).toUpperCase() + troopType.slice(1) : '';
    const bt = buildType ? buildType.charAt(0).toUpperCase() + buildType.slice(1) : '';
    document.title = `${action} ${tt} ${bt} Build - 3584 Commanders`;
  }, [buildId, troopType, buildType]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [govRes, commandersRes, allCommandersRes, inscriptionsRes, armamentsRes] = await Promise.all([
        governorService.getById(id),
        dataService.getCommanders(troopType),  // Filtered by troopType for primary
        dataService.getCommanders(),  // All commanders for secondary
        dataService.getInscriptions(),
        dataService.getArmaments(),
      ]);

      setGovernor(govRes.data.governor);
      setCommanders(commandersRes.data.commanders || []);
      setAllCommanders(allCommandersRes.data.commanders || []);
      setAllInscriptions(inscriptionsRes.data.inscriptions || []);
      setArmaments(armamentsRes.data.armaments || []);

      // If editing, load existing build
      if (buildId) {
        const buildRes = await buildService.getById(id, buildId);
        const build = buildRes.data.build;
        setFormData({
          primaryCommander: build.primaryCommander || '',
          secondaryCommander: build.secondaryCommander || '',
          equipment: build.equipment || formData.equipment,
          armament: build.armament || formData.armament,
          manualStats: build.manualStats || {
            attack: 0,
            defense: 0,
            health: 0,
            marchSpeed: 0,
            allDamage: 0,
          },
        });
        setScreenshots(build.screenshots || []);
      }
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommanderChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (slot, data) => {
    setFormData((prev) => ({
      ...prev,
      equipment: { ...prev.equipment, [slot]: data },
    }));
  };

  const handleFormationChange = (formation) => {
    // When formation changes, clear all inscriptions
    setFormData((prev) => ({
      ...prev,
      armament: {
        formation: formation || null,
        emblem: { inscriptions: [] },
        flag: { inscriptions: [] },
        instrument: { inscriptions: [] },
        scroll: { inscriptions: [] },
      },
    }));
  };

  const handleInscriptionToggle = (slot, inscriptionId) => {
    setFormData((prev) => {
      const current = prev.armament[slot]?.inscriptions || [];
      const updated = current.includes(inscriptionId)
        ? current.filter((id) => id !== inscriptionId)
        : [...current, inscriptionId];
      return {
        ...prev,
        armament: {
          ...prev.armament,
          [slot]: { inscriptions: updated },
        },
      };
    });
  };

  const handleManualStatChange = (stat, value) => {
    setFormData((prev) => ({
      ...prev,
      manualStats: {
        ...prev.manualStats,
        [stat]: parseFloat(value) || 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (buildId) {
        await buildService.update(id, buildId, formData);
      } else {
        await buildService.create(id, {
          troopType,
          buildType,
          ...formData,
        });
      }
      navigate(`/governor/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save build');
    } finally {
      setSaving(false);
    }
  };

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !buildId) return;

    setUploading(true);
    setError('');

    try {
      const response = await uploadService.uploadScreenshot(id, buildId, file);
      setScreenshots(response.data.screenshots || []);
      // Reset the file input
      e.target.value = '';
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload screenshot');
    } finally {
      setUploading(false);
    }
  };

  const handleScreenshotDelete = async (publicId) => {
    if (!buildId || !publicId) return;

    setUploading(true);
    setError('');

    try {
      const response = await uploadService.deleteScreenshot(id, buildId, publicId);
      setScreenshots(response.data.screenshots || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete screenshot');
    } finally {
      setUploading(false);
    }
  };

  // Get inscriptions for a specific formation and slot
  const getSlotInscriptions = (slot) => {
    if (!formData.armament.formation) return [];
    return allInscriptions.filter(
      (insc) => insc.formation === formData.armament.formation && insc.slot === slot
    );
  };

  // Group inscriptions by tier
  const groupByTier = (inscriptions) => {
    const grouped = {};
    TIER_ORDER.forEach((tier) => {
      grouped[tier] = inscriptions.filter((i) => i.tier === tier);
    });
    return grouped;
  };

  // Calculate equipment stats - must be before any conditional returns
  const equipmentStats = useMemo(() => {
    return calculateEquipmentStats(formData.equipment, troopType);
  }, [formData.equipment, troopType]);

  // Calculate armament/inscription stats
  const armamentStats = useMemo(() => {
    return calculateArmamentStats(formData.armament, allInscriptions);
  }, [formData.armament, allInscriptions]);

  // Calculate combined total stats (including manual stats)
  const totalStats = useMemo(() => {
    const baseStats = calculateTotalStats(equipmentStats, armamentStats);
    return {
      ...baseStats,
      attack: baseStats.attack + (formData.manualStats?.attack || 0),
      defense: baseStats.defense + (formData.manualStats?.defense || 0),
      health: baseStats.health + (formData.manualStats?.health || 0),
      marchSpeed: baseStats.marchSpeed + (formData.manualStats?.marchSpeed || 0),
      allDamage: baseStats.allDamage + (formData.manualStats?.allDamage || 0),
    };
  }, [equipmentStats, armamentStats, formData.manualStats]);

  // Calculate set bonuses - must be before any conditional returns
  const { setCounts, activeBonuses } = useMemo(() => {
    const counts = countSetPieces(formData.equipment);
    const bonuses = getActiveSetBonuses(counts);
    return { setCounts: counts, activeBonuses: bonuses };
  }, [formData.equipment]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const getLabel = () => {
    const tt = troopType.charAt(0).toUpperCase() + troopType.slice(1);
    const bt = buildType.charAt(0).toUpperCase() + buildType.slice(1);
    return `${tt} ${bt}`;
  };

  const selectedFormation = armaments.find((a) => a.armamentId === formData.armament.formation);

  return (
    <div className="build-form-page">
      <button className="back-btn" onClick={() => navigate(`/governor/${id}`)}>
        &larr; Back to {governor?.name}
      </button>

      <h1>{buildId ? 'Edit' : 'Create'} {getLabel()} Build</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Commanders</h2>
          <div className="commanders-row">
            <CommanderSelect
              label="Primary Commander"
              commanders={commanders}
              value={formData.primaryCommander}
              onChange={(v) => handleCommanderChange('primaryCommander', v)}
              filterRole="primary"
              buildType={buildType}
            />
            <CommanderSelect
              label="Secondary Commander"
              commanders={allCommanders}
              value={formData.secondaryCommander}
              onChange={(v) => handleCommanderChange('secondaryCommander', v)}
              filterRole="secondary"
              buildType={buildType}
            />
          </div>
        </section>

        <section className="form-section">
          <h2>Equipment</h2>
          <div className="equipment-grid">
            {EQUIPMENT_SLOTS.map((slot) => (
              <EquipmentSlot
                key={slot}
                slot={slot}
                value={formData.equipment[slot]}
                onChange={(data) => handleEquipmentChange(slot, data)}
              />
            ))}
          </div>

          {/* Total Stats Summary Box (Equipment + Armaments) */}
          <div className="stats-summary-box total-stats-box">
            <h3>Total Stats (Equipment + Armaments)</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Attack</span>
                <span className="stat-value attack">{formatStat(totalStats.attack) || '0%'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Defense</span>
                <span className="stat-value defense">{formatStat(totalStats.defense) || '0%'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Health</span>
                <span className="stat-value health">{formatStat(totalStats.health) || '0%'}</span>
              </div>
              {totalStats.allDamage > 0 && (
                <div className="stat-item">
                  <span className="stat-label">All Damage</span>
                  <span className="stat-value damage">{formatStat(totalStats.allDamage)}</span>
                </div>
              )}
              {totalStats.skillDamage > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Skill Damage</span>
                  <span className="stat-value damage">{formatStat(totalStats.skillDamage, false)}</span>
                </div>
              )}
              {totalStats.normalAttack > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Normal Attack</span>
                  <span className="stat-value damage">{formatStat(totalStats.normalAttack, false)}</span>
                </div>
              )}
              {totalStats.counterattack > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Counterattack</span>
                  <span className="stat-value damage">{formatStat(totalStats.counterattack, false)}</span>
                </div>
              )}
              {totalStats.smiteDamage > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Smite Damage</span>
                  <span className="stat-value damage">{formatStat(totalStats.smiteDamage, false)}</span>
                </div>
              )}
              {totalStats.comboDamage > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Combo Damage</span>
                  <span className="stat-value damage">{formatStat(totalStats.comboDamage, false)}</span>
                </div>
              )}
              {totalStats.marchSpeed > 0 && (
                <div className="stat-item">
                  <span className="stat-label">March Speed</span>
                  <span className="stat-value">{formatStat(totalStats.marchSpeed)}</span>
                </div>
              )}
              {totalStats.skillDmgReduction > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Skill Dmg Reduction</span>
                  <span className="stat-value">{formatStat(totalStats.skillDmgReduction, false)}</span>
                </div>
              )}
            </div>

            {/* Set Bonuses */}
            {activeBonuses.length > 0 && (
              <div className="set-bonuses">
                <h4>Active Set Bonuses</h4>
                {activeBonuses.map((bonus, idx) => (
                  <div key={idx} className="set-bonus-item">
                    <span className="set-name">{bonus.setName} ({bonus.pieces}pc):</span>
                    <span className="set-effect">{bonus.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Set Piece Counts */}
            {Object.keys(setCounts).length > 0 && (
              <div className="set-counts">
                <h4>Set Pieces</h4>
                <div className="set-count-list">
                  {Object.entries(setCounts).map(([setName, count]) => (
                    <span key={setName} className="set-count-badge">
                      {setName}: {count}/6
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="form-section">
          <h2>Armament</h2>

          <div className="armament-type-selector">
            <label>Formation</label>
            <select
              value={formData.armament.formation || ''}
              onChange={(e) => handleFormationChange(e.target.value)}
            >
              <option value="">Select Formation</option>
              {armaments.map((arm) => (
                <option key={arm.armamentId} value={arm.armamentId}>
                  {arm.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFormation && (
            <p className="armament-description">
              Selected: <strong>{selectedFormation.name}</strong> formation with 4 slots: Emblem, Flag, Instrument, Scroll
            </p>
          )}
        </section>

        <section className="form-section">
          <h2>Inscriptions</h2>

          {!formData.armament.formation ? (
            <p className="hint">Select a formation above to see available inscriptions for each slot</p>
          ) : (
            <div className="inscription-slots">
              {ARMAMENT_SLOTS.map((slot) => {
                const slotInscriptions = getSlotInscriptions(slot);
                const groupedInscriptions = groupByTier(slotInscriptions);
                const selectedCount = formData.armament[slot]?.inscriptions?.length || 0;

                return (
                  <div key={slot} className="inscription-slot">
                    <h3 className="slot-title">
                      {slot.charAt(0).toUpperCase() + slot.slice(1)}
                      <span className="selected-count">({selectedCount} selected)</span>
                    </h3>

                    {TIER_ORDER.map((tier) => {
                      const tierInscriptions = groupedInscriptions[tier] || [];
                      if (!tierInscriptions.length) return null;

                      return (
                        <div key={tier} className={`tier-group tier-${tier.toLowerCase()}`}>
                          <div className="tier-header">
                            <span className="tier-badge" style={{ backgroundColor: TIER_COLORS[tier] }}>{tier}</span>
                            <span className="tier-label-text">{tier}-Tier</span>
                          </div>
                          <div className="inscription-options">
                            {tierInscriptions.map((insc) => {
                              const isSelected = formData.armament[slot]?.inscriptions?.includes(insc.inscriptionId);
                              const description = INSCRIPTION_DESCRIPTIONS[insc.name] || '';

                              return (
                                <button
                                  key={insc.inscriptionId}
                                  type="button"
                                  className={`inscription-btn ${isSelected ? 'selected' : ''}`}
                                  style={{
                                    borderColor: isSelected ? TIER_COLORS[tier] : 'transparent',
                                    backgroundColor: isSelected ? `${TIER_COLORS[tier]}20` : 'rgba(255,255,255,0.05)'
                                  }}
                                  onClick={() => handleInscriptionToggle(slot, insc.inscriptionId)}
                                  data-tooltip={description}
                                >
                                  <span className="inscription-name" style={{ color: TIER_COLORS[tier] }}>
                                    {insc.name}
                                  </span>
                                  {description && (
                                    <span className="inscription-tooltip">{description}</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="form-section">
          <h2>Additional Stats</h2>
          <p className="hint">Add any additional stats from talents, civilization bonuses, VIP, etc.</p>
          <div className="manual-stats-grid">
            <div className="manual-stat-input">
              <label>Attack (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.manualStats?.attack || ''}
                onChange={(e) => handleManualStatChange('attack', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="manual-stat-input">
              <label>Defense (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.manualStats?.defense || ''}
                onChange={(e) => handleManualStatChange('defense', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="manual-stat-input">
              <label>Health (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.manualStats?.health || ''}
                onChange={(e) => handleManualStatChange('health', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="manual-stat-input">
              <label>March Speed (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.manualStats?.marchSpeed || ''}
                onChange={(e) => handleManualStatChange('marchSpeed', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="manual-stat-input">
              <label>All Damage (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.manualStats?.allDamage || ''}
                onChange={(e) => handleManualStatChange('allDamage', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </section>

        {buildId && (
          <section className="form-section">
            <h2>Screenshots ({(screenshots || []).length}/5)</h2>
            <p className="hint">Upload screenshots of your commander's equipment from the game</p>

            {screenshots && screenshots.length > 0 && (
              <div className="screenshots-gallery">
                {screenshots.map((screenshot, index) => (
                  <div key={screenshot.publicId} className="screenshot-item">
                    <img src={screenshot.url} alt={`Build screenshot ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-delete-screenshot"
                      onClick={() => handleScreenshotDelete(screenshot.publicId)}
                      disabled={uploading}
                    >
                      {uploading ? '...' : 'X'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(!screenshots || screenshots.length < 5) && (
              <div className="screenshot-upload">
                <label className="upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    disabled={uploading}
                  />
                  {uploading ? 'Uploading...' : 'Add Screenshot'}
                </label>
                <p className="upload-hint">Max 5MB per image, JPG/PNG/WebP</p>
              </div>
            )}
          </section>
        )}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(`/governor/${id}`)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Build'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuildForm;
