const { predictionService } = require('../services/predictionService');
const RiceVarietyPredictionHistory = require('../models/riceVarietyPredictionHistory');
const RiceDiseasePredictionHistory = require('../models/riceDiseasePredictionHistory');
const NutrientDeficiencyPredictionHistory = require('../models/nutrientDeficiencyPredictionHistory');

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
      const userId = req.user.id;

      // Access other form fields if needed
      const { model } = req.body;

        // Validate the model value
        const validModels = ['riceVariety', 'nutrientDeficiency', 'riceDisease'];
        if (!validModels.includes(model)) {
          return res.status(400).json({ error: 'Invalid model value.' });
        }

      // Call the image service to handle the upload and prediction
      const result = await predictionService(file, model, userId);

      if (result.error) {
        // Error occurred during prediction
        return res.status(500).json({ error: result.error });
      }

      // Successful prediction
      res.status(200).json({ success: true, result });
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPredictions(req, res) {
  try {
    const riceVarietyHistories = await RiceVarietyPredictionHistory.findAll();
    const riceDiseaseHistories = await RiceDiseasePredictionHistory.findAll();
    const nutrientDeficiencyHistories = await NutrientDeficiencyPredictionHistory.findAll();

    const allHistories = [...riceVarietyHistories, ...riceDiseaseHistories, ...nutrientDeficiencyHistories];

    res.json(allHistories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  predict,
  getPredictions
};
