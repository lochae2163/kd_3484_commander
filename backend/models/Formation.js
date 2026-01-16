import mongoose from 'mongoose';

const formationStatsSchema = new mongoose.Schema({
  attack_dmg: { type: Number, default: 0 },
  skill_dmg: { type: Number, default: 0 },
  all_dmg_reduction: { type: Number, default: 0 },
  combo_dmg: { type: Number, default: 0 },
  smite_dmg: { type: Number, default: 0 },
  healing_received: { type: Number, default: 0 },
  march_speed: { type: Number, default: 0 }
}, { _id: false });

const formationSchema = new mongoose.Schema({
  formation_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  combat_effect: {
    type: String,
    required: true
  },
  best_use_case: {
    type: String,
    default: ''
  },
  stats: {
    type: formationStatsSchema,
    required: true
  },
  special_effect: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Formation', formationSchema);
