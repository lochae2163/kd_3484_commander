import Commander from '../models/Commander.js';
import Equipment from '../models/Equipment.js';
import Inscription from '../models/Inscription.js';
import Armament from '../models/Armament.js';

/**
 * Get all commanders
 */
export const getAllCommanders = async (req, res) => {
  try {
    const { troopType, role } = req.query;
    let query = {};

    if (troopType) {
      query.troopType = troopType.toLowerCase();
    }

    if (role) {
      query.roles = role.toLowerCase();
    }

    const commanders = await Commander.find(query).sort({ name: 1 });
    res.status(200).json({ success: true, count: commanders.length, commanders });
  } catch (error) {
    console.error('Error fetching commanders:', error);
    res.status(500).json({ error: 'Failed to fetch commanders' });
  }
};

/**
 * Get all equipment
 */
export const getAllEquipment = async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type: type.toUpperCase() } : {};

    const equipment = await Equipment.find(query).sort({ name: 1 });
    res.status(200).json({ success: true, count: equipment.length, equipment });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};

/**
 * Get all inscriptions (optionally filter by formation, slot, and/or tier)
 */
export const getAllInscriptions = async (req, res) => {
  try {
    const { formation, slot, tier } = req.query;
    let query = {};

    if (formation) {
      query.formation = formation.toLowerCase();
    }

    if (slot) {
      query.slot = slot.toLowerCase();
    }

    if (tier) {
      query.tier = tier.toUpperCase();
    }

    // Sort by tier (S, A, B, C) then by name
    const tierOrder = { 'S': 1, 'A': 2, 'B': 3, 'C': 4 };
    const inscriptions = await Inscription.find(query).sort({ name: 1 });

    // Sort by tier order
    inscriptions.sort((a, b) => {
      const tierDiff = (tierOrder[a.tier] || 5) - (tierOrder[b.tier] || 5);
      if (tierDiff !== 0) return tierDiff;
      return a.name.localeCompare(b.name);
    });

    res.status(200).json({ success: true, count: inscriptions.length, inscriptions });
  } catch (error) {
    console.error('Error fetching inscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch inscriptions' });
  }
};

/**
 * Get all armaments
 */
export const getAllArmaments = async (req, res) => {
  try {
    const armaments = await Armament.find().sort({ name: 1 });
    res.status(200).json({ success: true, count: armaments.length, armaments });
  } catch (error) {
    console.error('Error fetching armaments:', error);
    res.status(500).json({ error: 'Failed to fetch armaments' });
  }
};
