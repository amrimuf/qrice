const { Storage } = require('@google-cloud/storage');
const axios = require('axios');
const sequelize = require('../config/database');
const RiceVarieties = require('../models/riceVariety')
const RiceDiseases = require('../models/riceDisease')
const NutrientDeficiencies = require('../models/nutrientDeficiency')
const SeedQuality = require('../models/seedQuality');
const RiceVarietyPredictionHistory = require('../models/riceVarietyPredictionHistory');
const RiceDiseasePredictionHistory = require('../models/riceDiseasePredictionHistory');
const NutrientDeficiencyPredictionHistory = require('../models/nutrientDeficiencyPredictionHistory');
const SeedQualityPredictionHistory = require('../models/seedQualityPredictionHistory');

require('dotenv').config();

const keyFilename = './service-account-key.json';
const storage = new Storage({ keyFilename });

async function uploadToBucket(file) {
  try {
    const bucketName = process.env.BUCKET_NAME; 
    const uniqueFilename = `${Date.now()}_${file.originalname}`;
    const destinationPath = `images/${uniqueFilename}`; // Specify the directory within the bucket

    const bucket = storage.bucket(bucketName);
    const fileBlob = bucket.file(destinationPath);

    await fileBlob.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    return uniqueFilename;
  } catch (error) {
    throw new Error('Failed to upload file to bucket');
  }
}

async function callPredictionAPI(model, imageFilename) {
  try {
    const payload = {
      model: model,
      imageFilename: imageFilename,
    };

    let predictionResult = '';

    // predictionResult not only prediction name, but also performance 
    // only for riceDisease

    const response = await axios.post('https://q-rice.et.r.appspot.com/', payload);
    predictionResult = response.data.prediction;

    return predictionResult;
  } catch (error) {
    throw new Error('Failed to call prediction API');
  }
}

async function saveToDatabase(model, userId, imageFilename, predictionResult) {

  try {
    await sequelize.sync(); // Ensure the database tables are created

    let history;

    if (model === 'riceVariety') {
      const riceVariety = await RiceVarieties.findOne({
        where: { name: predictionResult },
      });

      history = await RiceVarietyPredictionHistory.create({
        userId,
        rice_variety_id: riceVariety.id,
        imageFilename,
        predictionResult,
      });
    } else if (model === 'nutrientDeficiency') {
      const nutrientDeficiency = await NutrientDeficiencies.findOne({
        where: { name: predictionResult },
      });

      history = await NutrientDeficiencyPredictionHistory.create({
        userId,
        nutrient_deficiency_id: nutrientDeficiency.id,
        imageFilename,
        predictionResult,
      });
    } else if (model === 'riceDisease') {
      const riceDisease = await RiceDiseases.findOne({
        where: { name: predictionResult },
      });

      history = await RiceDiseasePredictionHistory.create({
        userId,
        rice_disease_id: riceDisease.id,
        imageFilename,
        predictionResult,
      });
    } else if (model === 'seedQuality') {
      const seedQuality = await SeedQuality.findOne({
        where: { name: predictionResult },
      });

      history = await SeedQualityPredictionHistory.create({
        userId,
        seed_quality_id: seedQuality.id,
        imageFilename,
        predictionResult,
      });
    } else {
      throw new Error('Invalid model type');
    }

    return history;

  } catch (error) {
    throw new Error('Failed to save to database');
  }
}

module.exports = {
  uploadToBucket,
  callPredictionAPI,
  saveToDatabase,
};
