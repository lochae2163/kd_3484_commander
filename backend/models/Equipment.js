import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  attack: { type: Number, default: 0 },
  defense: { type: Number, default: 0 },
  health: { type: Number, default: 0 },
  all_dmg: { type: Number, default: 0 },
  na: { type: Number, default: 0 },
  ca: { type: Number, default: 0 },
  skill_dmg: { type: Number, default: 0 },
  smite_dmg: { type: Number, default: 0 },
  combo_dmg: { type: Number, default: 0 }
}, { _id: false });

const multipliersSchema = new mongoose.Schema({
  all_dmg: { type: Number, default: 0 },
  skill_dmg: { type: Number, default: 0 },
  smite_dmg: { type: Number, default: 0 },
  combo_dmg: { type: Number, default: 0 }
}, { _id: false });

const iconicLevelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['Iconic I', 'Iconic II', 'Iconic III', 'Iconic IV', 'Iconic V']
  },
  stats: {
    type: statsSchema,
    required: true
  },
  multipliers: {
    type: multipliersSchema,
    default: {}
  }
}, { _id: false });

const equipmentSchema = new mongoose.Schema({
  equipment_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['WEAPON', 'HELMET', 'CHEST', 'GLOVES', 'LEGS', 'BOOTS', 'ACCESSORY']
  },
  troopType: {
    type: String,
    enum: ['infantry', 'cavalry', 'archer', 'leadership', 'universal'],
    default: 'universal'
  },
  baseStat: {
    type: String,
    default: null
    // Human-readable stat description, e.g., "+25% Cavalry Attack"
  },
  baseStatType: {
    type: String,
    enum: ['attack', 'defense', 'health'],
    default: null
  },
  baseStatValue: {
    type: Number,
    default: 0
    // The percentage value of the base stat
  },
  set_name: {
    type: String,
    default: null
    // e.g., "Hellish Wasteland", "Dragon Breath", "Eternal Empire", "Garb of the Glorious Goddess"
  },
  iconic_levels: [iconicLevelSchema],
  special_talent_available: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Index for faster queries
equipmentSchema.index({ type: 1, set_name: 1 });

export default mongoose.model('Equipment', equipmentSchema);
