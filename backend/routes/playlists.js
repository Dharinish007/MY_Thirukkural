const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const Kural = require('../models/Kural');
const { protect } = require('../middleware/auth');

/**
 * GET /api/playlists
 * Get all playlists (system + user's own + public)
 */
router.get('/', protect, async (req, res) => {
  try {
    const { type = 'all' } = req.query;

    let query = {};

    switch (type) {
      case 'system':
        query.isSystem = true;
        break;
      case 'my':
        query.createdBy = req.user.id;
        break;
      case 'public':
        query.isPublic = true;
        query.isSystem = false;
        break;
      case 'all':
      default:
        query.$or = [
          { isSystem: true },
          { createdBy: req.user.id },
          { isPublic: true }
        ];
        break;
    }

    const playlists = await Playlist.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Enhance with Kural count
    const enhancedPlaylists = playlists.map(playlist => ({
      id: playlist._id,
      name: playlist.name,
      description: playlist.description,
      is_system: playlist.isSystem,
      is_public: playlist.isPublic,
      created_by: playlist.createdBy,
      kural_count: playlist.kurals.length,
      theme: playlist.theme,
      cover_image: playlist.coverImage,
      play_count: playlist.playCount,
      like_count: playlist.likeCount,
      tags: playlist.tags,
      created_at: playlist.createdAt
    }));

    res.json({
      success: true,
      data: { playlists: enhancedPlaylists }
    });

  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get playlists',
      error: error.message
    });
  }
});

/**
 * GET /api/playlists/:id
 * Get a specific playlist with Kurals
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id).populate('createdBy', 'name email');

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check access
    if (!playlist.isSystem && !playlist.isPublic && 
        playlist.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get Kurals
    const kurals = await Kural.find({ number: { $in: playlist.kurals } });

    res.json({
      success: true,
      data: {
        playlist: {
          id: playlist._id,
          name: playlist.name,
          description: playlist.description,
          is_system: playlist.isSystem,
          is_public: playlist.isPublic,
          created_by: playlist.createdBy,
          theme: playlist.theme,
          cover_image: playlist.coverImage,
          play_count: playlist.playCount,
          like_count: playlist.likeCount,
          tags: playlist.tags,
          created_at: playlist.createdAt
        },
        kurals: kurals.map(k => ({
          kural_number: k.number,
          tamil_text: k.tamilText,
          english_translation: k.translation,
          paal: k.paal,
          adhigaram_number: k.adhigaramNumber
        }))
      }
    });

  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get playlist',
      error: error.message
    });
  }
});

/**
 * POST /api/playlists
 * Create a new playlist
 */
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, isPublic, kurals, theme, tags } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Playlist name is required'
      });
    }

    const playlist = await Playlist.create({
      name,
      description,
      createdBy: req.user.id,
      isPublic: isPublic || false,
      kurals: kurals || [],
      theme,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Playlist created',
      data: { playlist }
    });

  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create playlist',
      error: error.message
    });
  }
});

/**
 * PUT /api/playlists/:id
 * Update a playlist
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isPublic, kurals, theme, tags } = req.body;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.createdBy.toString() !== req.user.id && !playlist.isSystem) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update fields
    if (name) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (isPublic !== undefined) playlist.isPublic = isPublic;
    if (kurals) playlist.kurals = kurals;
    if (theme) playlist.theme = theme;
    if (tags) playlist.tags = tags;

    await playlist.save();

    res.json({
      success: true,
      message: 'Playlist updated',
      data: { playlist }
    });

  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update playlist',
      error: error.message
    });
  }
});

/**
 * DELETE /api/playlists/:id
 * Delete a playlist
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Cannot delete system playlists
    if (playlist.isSystem) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete system playlists'
      });
    }

    await playlist.deleteOne();

    res.json({
      success: true,
      message: 'Playlist deleted'
    });

  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete playlist',
      error: error.message
    });
  }
});

/**
 * POST /api/playlists/:id/kurals
 * Add Kurals to a playlist
 */
router.post('/:id/kurals', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { kuralNumbers } = req.body;

    if (!kuralNumbers || !Array.isArray(kuralNumbers)) {
      return res.status(400).json({
        success: false,
        message: 'Kural numbers array is required'
      });
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Add Kurals (avoid duplicates)
    kuralNumbers.forEach(num => {
      if (!playlist.kurals.includes(num)) {
        playlist.kurals.push(num);
      }
    });

    await playlist.save();

    res.json({
      success: true,
      message: 'Kurals added to playlist',
      data: { playlist }
    });

  } catch (error) {
    console.error('Add Kurals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add Kurals to playlist',
      error: error.message
    });
  }
});

/**
 * DELETE /api/playlists/:id/kurals/:kuralNumber
 * Remove a Kural from a playlist
 */
router.delete('/:id/kurals/:kuralNumber', protect, async (req, res) => {
  try {
    const { id, kuralNumber } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check ownership
    if (playlist.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Remove Kural
    playlist.kurals = playlist.kurals.filter(num => num !== parseInt(kuralNumber));

    await playlist.save();

    res.json({
      success: true,
      message: 'Kural removed from playlist',
      data: { playlist }
    });

  } catch (error) {
    console.error('Remove Kural error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove Kural from playlist',
      error: error.message
    });
  }
});

/**
 * POST /api/playlists/:id/play
 * Increment play count
 */
router.post('/:id/play', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { $inc: { playCount: 1 } },
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    res.json({
      success: true,
      message: 'Play count updated',
      data: { play_count: playlist.playCount }
    });

  } catch (error) {
    console.error('Update play count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update play count',
      error: error.message
    });
  }
});

module.exports = router;
