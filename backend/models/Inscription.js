import mongoose from 'mongoose';

const inscriptionSchema = new mongoose.Schema({
  inscriptionId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  formation: {
    type: String,
    required: true,
    enum: ['pincer', 'tercio', 'delta', 'hollow_square', 'arch', 'wedge']
  },
  slot: {
    type: String,
    required: true,
    enum: ['emblem', 'flag', 'instrument', 'scroll']
  },
  tier: {
    type: String,
    required: true,
    enum: ['S', 'A', 'B', 'C']
  }
}, { timestamps: true });

// Indexes for faster queries
inscriptionSchema.index({ formation: 1 });
inscriptionSchema.index({ slot: 1 });
inscriptionSchema.index({ tier: 1 });
inscriptionSchema.index({ formation: 1, slot: 1 });
inscriptionSchema.index({ formation: 1, slot: 1, tier: 1 });

export default mongoose.model('Inscription', inscriptionSchema);
