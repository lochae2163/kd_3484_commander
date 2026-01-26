import express from 'express';
import { upload, deleteImage } from '../config/cloudinary.js';
import { authMiddleware } from '../middleware/auth.js';
import GovernorBuild from '../models/GovernorBuild.js';
import Governor from '../models/Governor.js';

const router = express.Router();

/**
 * POST /api/upload/build/:governorId/:buildId
 * Upload screenshot for a build
 */
router.post('/build/:governorId/:buildId', authMiddleware, upload.single('screenshot'), async (req, res) => {
  try {
    const { governorId, buildId } = req.params;

    // Check if user owns this governor
    const governor = await Governor.findById(governorId);
    if (!governor) {
      return res.status(404).json({ error: 'Governor not found' });
    }

    // Check ownership (admin can edit anyone's)
    if (req.user.role !== 'admin' &&
        (!governor.userId || governor.userId.toString() !== req.user._id.toString())) {
      return res.status(403).json({ error: 'You can only upload images to your own builds' });
    }

    // Find the build
    const build = await GovernorBuild.findOne({ _id: buildId, governorId });
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }

    // If there's an existing image, delete it first
    if (build.screenshotPublicId) {
      await deleteImage(build.screenshotPublicId);
    }

    // Update build with new image
    build.screenshotUrl = req.file.path;
    build.screenshotPublicId = req.file.filename;
    await build.save();

    res.json({
      success: true,
      screenshotUrl: build.screenshotUrl,
      message: 'Screenshot uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload screenshot' });
  }
});

/**
 * DELETE /api/upload/build/:governorId/:buildId
 * Delete screenshot from a build
 */
router.delete('/build/:governorId/:buildId', authMiddleware, async (req, res) => {
  try {
    const { governorId, buildId } = req.params;

    // Check if user owns this governor
    const governor = await Governor.findById(governorId);
    if (!governor) {
      return res.status(404).json({ error: 'Governor not found' });
    }

    // Check ownership (admin can edit anyone's)
    if (req.user.role !== 'admin' &&
        (!governor.userId || governor.userId.toString() !== req.user._id.toString())) {
      return res.status(403).json({ error: 'You can only delete images from your own builds' });
    }

    // Find the build
    const build = await GovernorBuild.findOne({ _id: buildId, governorId });
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }

    // Delete from Cloudinary if exists
    if (build.screenshotPublicId) {
      await deleteImage(build.screenshotPublicId);
    }

    // Clear image fields
    build.screenshotUrl = null;
    build.screenshotPublicId = null;
    await build.save();

    res.json({
      success: true,
      message: 'Screenshot deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete screenshot' });
  }
});

export default router;
