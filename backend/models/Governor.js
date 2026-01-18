import mongoose from 'mongoose';

const governorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vipLevel: {
    type: Number,
    min: 0,
    max: 18,
    default: 0
  }
}, { timestamps: true });

// Index for faster queries
governorSchema.index({ name: 1 });

export default mongoose.model('Governor', governorSchema);
