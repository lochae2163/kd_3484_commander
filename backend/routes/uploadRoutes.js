import express from 'express';
import { upload, deleteImage } from '../config/cloudinary.js';
import { authMiddleware } from '../middleware/auth.js';
import GovernorBuild from '../models/GovernorBuild.js';
import Governor from '../models/Governor.js';

const router = express.Router();

const MAX_SCREENSHOTS = 5; // Maximum screenshots per build

/**
 * POST /api/upload/build/:governorId/:buildId
 * Upload a screenshot for a build (adds to array)
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

    // Check max screenshots limit
    if (build.screenshots && build.screenshots.length >= MAX_SCREENSHOTS) {
      return res.status(400).json({ error: `Maximum ${MAX_SCREENSHOTS} screenshots allowed per build` });
    }

    // Initialize screenshots array if needed
    if (!build.screenshots) {
      build.screenshots = [];
    }

    // Add new screenshot
    build.screenshots.push({
      url: req.file.path,
      publicId: req.file.filename
    });
    await build.save();

    res.json({
      success: true,
      screenshots: build.screenshots,
      message: 'Screenshot uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload screenshot' });
  }
});

/**
 * DELETE /api/upload/build/:governorId/:buildId/:publicId
 * Delete a specific screenshot from a build
 */
router.delete('/build/:governorId/:buildId/:publicId', authMiddleware, async (req, res) => {
  try {
    const { governorId, buildId, publicId } = req.params;

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

    // Find the screenshot
    const screenshotIndex = build.screenshots?.findIndex(s => s.publicId === publicId);
    if (screenshotIndex === -1 || screenshotIndex === undefined) {
      return res.status(404).json({ error: 'Screenshot not found' });
    }

    // Delete from Cloudinary
    await deleteImage(publicId);

    // Remove from array
    build.screenshots.splice(screenshotIndex, 1);
    await build.save();

    res.json({
      success: true,
      screenshots: build.screenshots,
      message: 'Screenshot deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete screenshot' });
  }
});

export default router;
