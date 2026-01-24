// Set bonus definitions
export const SET_BONUSES = {
  'Hellish Wasteland': {
    2: { health: 3, label: '+3% Troop Health' },
    4: { counterattack: 3, label: '+3 Counterattack Damage' },
    6: { cavalry_defense: 5, label: '+5% Cavalry Defense' }
  },
  'Eternal Empire': {
    2: { defense: 3, label: '+3% Troop Defense' },
    4: { march_speed: 10, label: '+10% March Speed' },
    6: { infantry_attack: 5, label: '+5% Infantry Attack' }
  },
  "Dragon's Breath": {
    2: { attack: 3, label: '+3% Troop Attack' },
    4: { skill_dmg: 3, label: '+3 Skill Damage' },
    6: { archer_health: 5, label: '+5% Archer Health' }
  },
  'Garb of the Glorious Goddess': {
    2: { defense: 3, label: '+3% Troop Defense' },
    4: { skill_dmg_reduction: 3, label: '+3 Skill Damage Reduction' },
    6: { health: 5, label: '+5% Troop Health' }
  }
};

// Calculate set pieces count from equipment
export function countSetPieces(equipment, equipmentData) {
  const setCounts = {};

  const slots = ['weapon', 'helmet', 'chest', 'gloves', 'legs', 'boots', 'accessory1', 'accessory2'];

  slots.forEach(slot => {
    const slotData = equipment[slot];
    if (slotData?.name) {
      const equipItem = equipmentData.find(e => e.name === slotData.name);
      if (equipItem?.set_name) {
        setCounts[equipItem.set_name] = (setCounts[equipItem.set_name] || 0) + 1;
      }
    }
  });

  return setCounts;
}

// Get active set bonuses based on piece counts
export function getActiveSetBonuses(setCounts) {
  const activeBonuses = [];

  Object.entries(setCounts).forEach(([setName, count]) => {
    const setBonus = SET_BONUSES[setName];
    if (setBonus) {
      if (count >= 6 && setBonus[6]) {
        activeBonuses.push({ setName, pieces: 6, ...setBonus[6] });
      }
      if (count >= 4 && setBonus[4]) {
        activeBonuses.push({ setName, pieces: 4, ...setBonus[4] });
      }
      if (count >= 2 && setBonus[2]) {
        activeBonuses.push({ setName, pieces: 2, ...setBonus[2] });
      }
    }
  });

  return activeBonuses;
}

// Calculate total stats from equipment
export function calculateEquipmentStats(equipment, equipmentData, troopType) {
  const stats = {
    attack: 0,
    defense: 0,
    health: 0,
    all_dmg: 0,
    skill_dmg: 0,
    counterattack: 0,
    march_speed: 0,
    skill_dmg_reduction: 0
  };

  const slots = ['weapon', 'helmet', 'chest', 'gloves', 'legs', 'boots', 'accessory1', 'accessory2'];

  slots.forEach(slot => {
    const slotData = equipment[slot];
    if (slotData?.name) {
      const equipItem = equipmentData.find(e => e.name === slotData.name);
      if (equipItem) {
        const iconicLevel = slotData.iconicLevel || 1;
        const iconicData = equipItem.iconic_levels?.find(l => l.level === `Iconic ${toRoman(iconicLevel)}`);

        if (iconicData?.stats) {
          let attackBonus = iconicData.stats.attack || 0;
          let defenseBonus = iconicData.stats.defense || 0;
          let healthBonus = iconicData.stats.health || 0;

          // Apply crit bonus (30% extra)
          if (slotData.hasCrit) {
            attackBonus *= 1.3;
            defenseBonus *= 1.3;
            healthBonus *= 1.3;
          }

          stats.attack += attackBonus;
          stats.defense += defenseBonus;
          stats.health += healthBonus;
        }

        if (iconicData?.multipliers) {
          let allDmgBonus = iconicData.multipliers.all_dmg || 0;
          let skillDmgBonus = iconicData.multipliers.skill_dmg || 0;

          // Apply crit bonus (30% extra)
          if (slotData.hasCrit) {
            allDmgBonus *= 1.3;
            skillDmgBonus *= 1.3;
          }

          stats.all_dmg += allDmgBonus;
          stats.skill_dmg += skillDmgBonus;
        }
      }
    }
  });

  // Apply set bonuses
  const setCounts = countSetPieces(equipment, equipmentData);
  const activeBonuses = getActiveSetBonuses(setCounts);

  activeBonuses.forEach(bonus => {
    if (bonus.attack) stats.attack += bonus.attack;
    if (bonus.defense) stats.defense += bonus.defense;
    if (bonus.health) stats.health += bonus.health;
    if (bonus.skill_dmg) stats.skill_dmg += bonus.skill_dmg;
    if (bonus.counterattack) stats.counterattack += bonus.counterattack;
    if (bonus.march_speed) stats.march_speed += bonus.march_speed;
    if (bonus.skill_dmg_reduction) stats.skill_dmg_reduction += bonus.skill_dmg_reduction;

    // Troop-specific bonuses
    if (bonus.infantry_attack && troopType === 'infantry') {
      stats.attack += bonus.infantry_attack;
    }
    if (bonus.cavalry_defense && troopType === 'cavalry') {
      stats.defense += bonus.cavalry_defense;
    }
    if (bonus.archer_health && troopType === 'archer') {
      stats.health += bonus.archer_health;
    }
  });

  return stats;
}

// Convert number to Roman numeral
function toRoman(num) {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  return romanNumerals[num - 1] || 'I';
}

// Format stat value for display
export function formatStat(value, isPercentage = true) {
  if (value === 0) return null;
  const formatted = value.toFixed(1).replace(/\.0$/, '');
  return isPercentage ? `${formatted}%` : formatted;
}
