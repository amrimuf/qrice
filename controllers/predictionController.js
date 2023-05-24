const { predictionService } = require('../services/predictionService');
const History = require('../models/history');

const multer = require('multer');

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

async function predict(req, res) {
  try {
    upload(req, res, async (err) => {
      if (err) {
        // Handle multer errors
        return res.status(400).json({ error: 'File upload error.' });
      }

      // Check if file exists in the request
      if (!req.file) {
        return res.status(400).json({ error: 'File is missing.' });
      }

      // Access the file object
      const file = req.file;

      // Access other form fields if needed
      const { model, categoryId, userId } = req.body;

      // Call the image service to handle the upload and prediction
      const result = await predictionService(file, model, categoryId, userId);

      res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPredictions(req, res) {
  try {
  const history = await History.findAll();
  res.json(history);
  } catch (error) {
  res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  predict,
  getPredictions
};
