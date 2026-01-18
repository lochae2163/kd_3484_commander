import mongoose from 'mongoose';

const commanderSchema = new mongoose.Schema({
  commanderId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  troopType: {
    type: String,
    required: true,
    enum: ['infantry', 'cavalry', 'archer', 'leadership']
  },
  roles: [{
    type: String,
    enum: ['rally', 'garrison', 'primary', 'secondary']
  }],
  damageType: {
    type: String,
    default: null
    // e.g., "skill", "smite", "normal_attack", "counter_attack"
  },
  imageUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Index for faster queries
commanderSchema.index({ troopType: 1, roles: 1 });

export default mongoose.model('Commander', commanderSchema);
