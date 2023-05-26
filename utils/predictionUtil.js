const { Storage } = require('@google-cloud/storage');
const axios = require('axios');
const sequelize = require('../config/database');
const RiceVarieties = require('../models/riceVariety')
const RiceDiseases = require('../models/riceDisease')
const NutrientDeficiencies = require('../models/nutrientDeficiency')
const RiceVarietyPredictionHistory = require('../models/riceVarietyPredictionHistory');
const RiceDiseasePredictionHistory = require('../models/riceDiseasePredictionHistory');
const NutrientDeficiencyPredictionHistory = require('../models/nutrientDeficiencyPredictionHistory');

require('dotenv').config();

const keyFilename = './service-account-key.json';
const storage = new Storage({ keyFilename });

async function uploadToBucket(file) {
  try {
    const bucketName = process.env.BUCKET_NAME; 
    const uniqueFilename = `${Date.now()}_${file.originalname}`;

    const bucket = storage.bucket(bucketName);
    const fileBlob = bucket.file(uniqueFilename);

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

    // BACK HERE: based on model value, call the corresponding api endpoint
    // predictionResult not only prediction name, but also performance 
    // only for riceDisease

    if (model === 'riceVariety') {
      const response = await axios.post('https://asia-southeast2-q-rice.cloudfunctions.net/mock-prediction', payload);
      predictionResult = response.data.prediction;
    } else if (model === 'nutrientDeficiency') {
      const response = await axios.post('https://asia-southeast2-q-rice.cloudfunctions.net/mock-prediction', payload);
      predictionResult = response.data.prediction;
    } else if (model === 'riceDisease') {
      const response = await axios.post('https://q-rice.et.r.appspot.com/', { imageFilename });
      predictionResult = response.data.prediction;
    }

    return predictionResult;
  } catch (error) {
    throw new Error('Failed to call prediction API');
  }
}

async function saveToDatabase(model, categoryId, userId, imageFilename, predictionResult) {

  // BACK HERE: categoryId migbt be deleted laters

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
