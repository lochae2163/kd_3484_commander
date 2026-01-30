// ROK Inscription Data with stats
// Data extracted from codexhelper.com

// Inscription stats - bonuses per inscription
export const INSCRIPTION_STATS = {
  // Formation bonuses
  "Arch": { na: 5 },
  "Wedge": { skillDamage: 5 },
  "Hollow Square": { allDamage: 2 },
  "Delta": { comboDamage: 10 },
  "Pincer": { smiteDamage: 10 },

  // Basic stat inscriptions (3.5% each)
  "Warcry": { attack: 3.5 },
  "Brutal": { attack: 3.5 },
  "Spiked": { attack: 3.5 },
  "Infamy": { attack: 3.5 },
  "Well Clad": { defense: 3.5 },
  "Armored": { defense: 3.5 },
  "Metallics": { defense: 3.5 },
  "Shielded": { defense: 3.5 },
  "Robust": { health: 3.5 },
  "Fit": { health: 3.5 },
  "Vitality": { health: 3.5 },
  "Hardy": { health: 3.5 },

  // Normal attack inscriptions
  "Onslaught": { na: 1.5 },
  "Warhunger": { na: 1.5 },
  "Striker": { na: 1.5 },
  "Militant": { na: 1.5 },
  "Iron Wall": { na: 1.5 },

  // Counterattack inscriptions
  "Retaliatory": { ca: 2.5 },
  "Alert": { ca: 2.5 },
  "Rebuff": { ca: 2.5 },
  "Resistant": { ca: 2.5 },
  "Evasive_Instrument": { ca: 2.5 },

  // CA + Skill Damage combo
  "Enraged": { ca: 1, skillDamage: 2.5 },
  "Devious": { ca: 1, skillDamage: 2.5 },
  "Brawler": { ca: 1, skillDamage: 2.5 },
  "Daring": { ca: 1, skillDamage: 2.5 },

  // All Damage inscriptions
  "Valiant": { allDamage: 1 },
  "Fearsome": { allDamage: 1 },
  "Warflames": { allDamage: 1 },
  "Elite": { allDamage: 1 },
  "Evasive_Emblem": { allDamage: 1 },
  "Bellicose": { allDamage: 1.07 },
  "Ward": { allDamage: 1.87 },
  "Respite": { allDamage: 1.42 },
  "Strategic": { allDamage: 2 },
  "Desperado": { allDamage: 2 },
  "Assertive": { allDamage: 2 },
  "Cohesive": { allDamage: 0.5 },
  "Pursuer": { allDamage: 0.75 },
  "Rapacious": { allDamage: 1.5 },
  "Watchmen": { allDamage: 1.5 },

  // Normal attack variations
  "Pulverize": { na: 1.42 },
  "Smite": { na: 2 },
  "Requital": { na: 1.78 },
  "Uplifting": { na: 1 },
  "Spirited": { na: 1 },
  "Lineshot": { na: 1 },

  // Attack variations
  "Breaker": { attack: 3.2 },
  "Calm": { attack: 2.3 },

  // Skill damage inscriptions
  "Guarded": { skillDamage: 1.42 },
  "Eclipsed": { skillDamage: 2.5 },
  "Deflecter": { skillDamage: 3 },
  "Furious": { na: 1.5, skillDamage: 4 },

  // CA variations
  "Brave": { ca: 5 },
  "Ballistics": { ca: 1.5 },
  "Enduring": { ca: 3 },
  "Guardians": { ca: 2 },
  "Counterer": { ca: 3 },
  "Artisan": { ca: 1, skillDamage: 3 },

  // Empty or special
  "Embattled": {},
  "Vengeful": {},
  "Siegework": {},
  "Sentries": {},

  // Arch formation exclusives
  "Destructive": { na: 3.5, skillDamage: -3.5, smiteDamage: -7, comboDamage: -3.5 },
  "Straight to the Point": { na: 5.78, skillDamage: -2.1 },
  "Invincible": { na: 4.5, skillDamage: 5 },
  "Fearless": { na: 8 },
  "Battle Ready": { na: 5, skillDamage: -3.5, smiteDamage: -6, comboDamage: -3.5 },
  "Even-Keeled": { allDamage: 1.07, na: 1.5, skillDamage: 2.1 },
  "Unswerving": { skillDamage: 4 },
  "Forceful": { na: 3 },

  // Wedge formation exclusives
  "Hunter": { skillDamage: 7 },
  "Unstoppable": { skillDamage: 6 },
  "Balanced": { na: 3.5, skillDamage: 4 },
  "Intrepid": { skillDamage: 10 },
  "Crazed": { skillDamage: 2.5 },
  "Boiling Blood": { skillDamage: 3.15 },
  "Defiant": { na: 3 },
  "Focus Fire": { skillDamage: 4 },

  // Hollow Square formation exclusives
  "Cocoon": { skillDamage: 5 },
  "Inviolable": { allDamage: 3.75 },
  "Crowned": { allDamage: 2.5 },
  "Rounded": { allDamage: 5 },
  "Self Defense": {},
  "Aegis": { allDamage: 1.875 },
  "Reinforced": {},
  "Tenacious": { allDamage: 2 },

  // Delta formation exclusives
  "Thrasher": { comboDamage: 7.5 },
  "Butterfly Effect": { comboDamage: 3.5, allDamage: 2.5 },
  "Steelskin": { allDamage: 7.5 },
  "Flurry": { comboDamage: 8 },
  "Pummeler": { comboDamage: 4 },
  "Causative": { comboDamage: 1.5, allDamage: 1.2 },
  "Determined": { allDamage: 1.5 },
  "Relentless": { comboDamage: 3.5 },

  // Pincer formation exclusives
  "Toppler": { smiteDamage: 10 },
  "Demolisher": { attack: 3.75, smiteDamage: 5 },
  "Airtight": { allDamage: 3.75 },
  "Thundering": { smiteDamage: 10 },
  "Imploder": { defense: 5 },
  "Raider": { smiteDamage: 3.75 },
  "Hardheaded": {},
  "Rattling": { smiteDamage: 4 },
};

// Formation data
export const FORMATIONS = [
  { id: 'arch', name: 'Arch', bonus: { na: 5 } },
  { id: 'wedge', name: 'Wedge', bonus: { skillDamage: 5 } },
  { id: 'hollow_square', name: 'Hollow Square', bonus: { allDamage: 2 } },
  { id: 'delta', name: 'Delta', bonus: { comboDamage: 10 } },
  { id: 'pincer', name: 'Pincer', bonus: { smiteDamage: 10 } },
];

// Tier colors
export const TIER_COLORS = {
  'S': '#ffd700', // Gold
  'A': '#c084fc', // Purple
  'B': '#60a5fa', // Blue
  'C': '#94a3b8', // Gray/White
};

// Inscription descriptions
export const INSCRIPTION_DESCRIPTIONS = {
  "Warcry": "Increases troop Attack by 3.5%.",
  "Well Clad": "Increases troop Defense by 3.5%.",
  "Robust": "Increases troop Health by 3.5%.",
  "Swift": "Increases troop March Speed by 2.5%.",
  "Onslaught": "Increases troop normal attack dealt by 1.5%.",
  "Retaliatory": "Increases troop counterattack damage dealt by 2.5%.",
  "Enraged": "Increases troop skill damage dealt by 2.5%.",
  "Valiant": "Increases troops damage dealt by 1%.",
  "Iron Wall": "Troop normal attack damage taken is reduced by 1.5%.",
  "Bellicose": "Troops normal attacks have a 10% chance to increase all troop damage by 5% for 3 seconds.",
  "Pulverize": "Troops normal attacks have a 10% chance to deal 20% increased normal attack damage for 1 second.",
  "Breaker": "Troops normal attacks have a 10% chance to reduce the target's defence by 15% for 3 seconds.",
  "Furious": "After using an active skill troops deal 8% more skill damage for 3 seconds.",
  "Ward": "After using an active skill troops take 5% less damage from all sources for 3 seconds.",
  "Calm": "Troops skill damage has a 30% chance to grant 10% increased attack for 3 seconds.",
  "Brutal": "Increases troop Attack by 3.5%.",
  "Armored": "Increases troop Defense by 3.5%.",
  "Fit": "Increases troop Health by 3.5%.",
  "Warhunger": "Increases troop normal attack dealt by 1.5%.",
  "Alert": "Increases troop counterattack damage dealt by 2.5%.",
  "Devious": "Increases troop skill damage dealt by 2.5%.",
  "Fearsome": "Increases troops damage dealt by 1%.",
  "Evasive": "Reduces troop counterattack damage taken by 2.5% (Instrument) or all damage taken by 1% (Emblem).",
  "Requital": "Troops under attack have a 10% chance of retaliating with additional damage.",
  "Respite": "When attacked, troops have a 10% chance to decrease all damage taken by 10% for 2 seconds.",
  "Guarded": "Troops taking skill damage have a 10% chance to decrease damage taken by 20%.",
  "Embattled": "Troops taking skill damage have a 10% chance to restore 50 rage.",
  "Vengeful": "Troops attacks grant additional 10 rage per 10% units lost.",
  "Uplifting": "Normal attacks deal 1% more damage (up to 5%) every 10 seconds after entering battle.",
  "Spirited": "Troops deal 5% increased damage of all types over 70% rage.",
  "Spiked": "Increases troop Attack by 3.5%.",
  "Metallics": "Increases troop Defense by 3.5%.",
  "Vitality": "Increases troop Health by 3.5%.",
  "Striker": "Increases troop normal attack dealt by 1.5%.",
  "Rebuff": "Increases troop counterattack damage dealt by 2.5%.",
  "Brawler": "Increases troop skill damage dealt by 2.5%.",
  "Warflames": "Increases troops damage dealt by 1%.",
  "Eclipsed": "Reduces troop skill damage taken by 2.5%.",
  "Brave": "Increases troops counterattack damage dealt by 5% when surrounded.",
  "Strategic": "Increases damage dealt to surrounded troops by 2%.",
  "Desperado": "Troops take 2% reduced damage when less than 50% units remain.",
  "Cohesive": "Troops deal 2% increased damage when over 50% units remain.",
  "Pursuer": "All troops damage dealt increased by 2% against troops with fewer than 20% units remaining.",
  "Assertive": "Increases troop damage dealt by 2% while on the map.",
  "Siegework": "All troops deal 2% increased damage when attacking a city or stronghold.",
  "Sentries": "Troops take 2% reduced damage while garrisoning.",
  "Ballistics": "Increases damage dealt by 3% in ranged mode.",
  "Infamy": "Increases troop Attack by 3.5%.",
  "Shielded": "Increases troop Defense by 3.5%.",
  "Hardy": "Increases troop Health by 3.5%.",
  "Militant": "Increases troop normal attack dealt by 1.5%.",
  "Resistant": "Increases troop counterattack damage dealt by 2.5%.",
  "Daring": "Increases troop skill damage dealt by 2.5%.",
  "Elite": "Increases troops damage dealt by 1%.",
  "Smite": "Increases troops normal attack damage by 2%.",
  "Enduring": "Increases troop counterattack damage by 3%.",
  "Artisan": "Increases troop skill damage dealt by 3%.",
  "Rapacious": "Increases troops damage dealt by 1.5%.",
  "Guardians": "Reduces troop damage taken by 2%.",
  "Counterer": "Troop counterattack damage taken 3%.",
  "Deflecter": "Reduces troop skill damage taken by 3%.",
  "Watchmen": "Reduces all troop damage taken by 1.5%.",
  "Lineshot": "Increases troop ranged normal attack damage by 5%.",
  // Formation exclusives
  "Destructive": "Troops receive a 3.5% boost to normal attack damage. Normal attacks have a 10% chance to consume 100 rage, increasing the damage of that attack by 70%.",
  "Straight to the Point": "Troops receive a 3.5% boost to normal attack damage. Normal attacks have a 10% chance to increase normal attacks by 20% and decrease skills by 10%.",
  "Invincible": "Increased troop skill damage resistance by 5%. Increased normal attack damage dealt by 3% per 20% of target units lost.",
  "Fearless": "Troops receive a 8% boost to normal attack damage.",
  "Battle Ready": "Whenever the troop launches a basic attack, it has a 10% chance to consume 100 rage to gain a 35% bonus to normal damage dealt.",
  "Even-Keeled": "The troop gains a 1.5% boost to normal damage dealt. Basic attacks have a 10% chance to reduce all incoming damage by 5%.",
  "Unswerving": "Increases the skill damage resistance of the troop by 4%.",
  "Forceful": "The troop gains a 3% boost to normal damage dealt.",
  "Hunter": "Troops receive a 5% boost to skill damage. Damage is boosted by 10% if only one target is hit.",
  "Unstoppable": "Troops receive a 5% boost to skill damage. Direct damage has a 30% chance to be boosted by 10%.",
  "Balanced": "Increased troops normal attack damage resistance by 3.5%. Troops deal 8% more skill damage upon reaching 80% rage.",
  "Intrepid": "Troops receive a 10% boost to skill damage.",
  "Crazed": "Whenever the troops deals direct damage, it gains 35 rage.",
  "Boiling Blood": "The troop gains a 2% boost to skill damage dealt. Direct damage has a 30% chance to reduce incoming skill damage by 5%.",
  "Defiant": "Increases the normal damage resistance of the troop by 3%.",
  "Focus Fire": "The troop gains a 4% boost to skill damage dealt.",
  "Cocoon": "Increases troop skill damage resistance by 5%. Normal attacks have a 10% chance to increase shield strength by 10%.",
  "Inviolable": "Troops receive a 5% boost to shields. Damage taken while you have a shield up is reduced by 10%.",
  "Crowned": "Troops receive a 5% boost to shields. Increases all troop damage dealt by 3% when using a shield.",
  "Rounded": "Increases troop damage resistance by 8%.",
  "Self Defense": "Basic attacks have a 10% chance to increase shield strength by 10% for 4 seconds.",
  "Aegis": "The troop gains a 2% boost to all shields. Takes 5% less skill damage while shielded.",
  "Reinforced": "The troop gains a 4% boost to all shields it creates.",
  "Tenacious": "Increases the damage resistance of the troop by 2%.",
  "Thrasher": "The troop gains a 3.5% boost to combo attack damage. Combo attacks grant a stacking 1.5% bonus.",
  "Butterfly Effect": "The troop gains a 3.5% boost to combo attack damage. Combo attacks are 20% more likely to trigger basic attack effects.",
  "Steelskin": "The troop gains 2% damage resistance. Basic attacks reduce damage taken by 1.5% (stacks up to 5 times).",
  "Flurry": "The troop gains a 8% boost to combo attack damage.",
  "Pummeler": "Combo attacks have an 80% chance to gain a 10% bonus to combo attack damage.",
  "Causative": "The troop gains a 1.5% boost to combo attack damage. Combo attacks are 8% more likely to trigger basic attack effects.",
  "Determined": "The troop gains 1.5% damage resistance.",
  "Relentless": "The troop gains a 3.5% boost to combo attack damage.",
  "Toppler": "The troop gains a 5% boost to smite damage. Smite damage causes target to take 20% increased smite damage.",
  "Demolisher": "The troop gains a 5% boost to smite damage. Smite damage has a 75% chance to ignore 50% of target's Defense.",
  "Airtight": "The troop gains 5% combo damage resistance. Smite damage causes troop to take 10% less damage.",
  "Thundering": "Troops gain 10% smite damage boost.",
  "Imploder": "Smite damage causes the target to lose 20% Defense for 2 seconds.",
  "Raider": "The troop gains 2% smite damage boost. Smite damage has 50% chance to gain Rage 20% faster.",
  "Hardheaded": "The troop gains 4% combo damage resistance.",
  "Rattling": "The troop gains 4% smite damage boost.",
};

// Calculate total inscription stats
export function calculateInscriptionStats(selectedInscriptions, formation) {
  const stats = {
    attack: 0,
    defense: 0,
    health: 0,
    allDamage: 0,
    skillDamage: 0,
    na: 0, // Normal attack damage
    ca: 0, // Counterattack damage
    smiteDamage: 0,
    comboDamage: 0,
  };

  // Add formation bonus
  if (formation) {
    const formationData = FORMATIONS.find(f => f.id === formation || f.name.toLowerCase().replace(' ', '_') === formation);
    if (formationData?.bonus) {
      Object.entries(formationData.bonus).forEach(([stat, value]) => {
        if (stats.hasOwnProperty(stat)) {
          stats[stat] += value;
        }
      });
    }
  }

  // Add inscription bonuses
  if (selectedInscriptions && Array.isArray(selectedInscriptions)) {
    selectedInscriptions.forEach(inscriptionName => {
      const inscStats = INSCRIPTION_STATS[inscriptionName];
      if (inscStats) {
        Object.entries(inscStats).forEach(([stat, value]) => {
          if (stats.hasOwnProperty(stat)) {
            stats[stat] += value;
          }
        });
      }
    });
  }

  return stats;
}

// Get all inscriptions for a formation and slot
export function getInscriptionsForSlot(formation, slot, inscriptions) {
  return inscriptions.filter(insc =>
    insc.formation === formation && insc.slot === slot
  );
}

// Format stat name for display
export function formatStatName(statKey) {
  const names = {
    attack: 'Attack',
    defense: 'Defense',
    health: 'Health',
    allDamage: 'All Damage',
    skillDamage: 'Skill Damage',
    na: 'Normal Attack',
    ca: 'Counterattack',
    smiteDamage: 'Smite Damage',
    comboDamage: 'Combo Damage',
  };
  return names[statKey] || statKey;
}
