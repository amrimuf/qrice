const { Storage } = require('@google-cloud/storage');
const axios = require('axios');
const sequelize = require('../config/database');
const History = require('../models/history');
require('dotenv').config();

const keyFilename = './service-account-key.json';
const storage = new Storage({ keyFilename });

async function uploadToBucket(file) {
  const bucketName = process.env.BUCKET_NAME;  // Replace with your actual bucket name
  const uniqueFilename = `${Date.now()}_${file.originalname}`;

  const bucket = storage.bucket(bucketName);
  const fileBlob = bucket.file(uniqueFilename);

  await fileBlob.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  return uniqueFilename;
}

async function callPredictionAPI(model, imageFilename) {
  
  const payload = {
    model: model,
    imageFilename: imageFilename,
  };

  let predictionResult = '';

  // Make the API call to the specific machine learning model
  // Replace the API endpoint and request payload with your own implementation
  if (model === 'model1') {
    const response = await axios.post('https://asia-southeast2-q-rice.cloudfunctions.net/mock-prediction', payload)
    predictionResult = response.data.prediction;
  } else if (model === 'model2') {
    const response = await axios.post('https://asia-southeast2-q-rice.cloudfunctions.net/mock-prediction', payload)
    predictionResult = response.data.prediction;
  }
  // Add more if conditions for other models

  return predictionResult;
}

async function saveToDatabase(model, categoryId, userId, imageFilename, predictionResult) {
  try {
    await sequelize.sync(); // Ensure the database tables are created

    // Save the history record to the database
    const history = await History.create({
      model,
      categoryId,
      userId,
      imageFilename,
      predictionResult,
    });

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
