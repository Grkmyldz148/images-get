const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const getImages = async (req, res, next) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '/images.json'));
    const stats = JSON.parse(data);
    if (!stats) {
      const err = new Error('Images not found');
      err.status = 404;
      throw err;
    }
    res.json(stats);
  } catch (e) {
    next(e);
  }
};
router
  .route('/api/v1/')
  .get(getImages);
module.exports = router;