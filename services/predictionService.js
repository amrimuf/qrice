const { uploadToBucket, callPredictionAPI, saveToDatabase } = require('../utils/predictionUtil');

async function predictionService(file, model, categoryId, userId) {
  try {

    // Upload the file to the bucket and get the unique filename
    const imageFilename = await uploadToBucket(file);

    // Call the prediction API based on the selected model
    const predictionResult = await callPredictionAPI(model, imageFilename);

    // Save the result and image filename to the database
    const result = await saveToDatabase(model, categoryId, userId, imageFilename, predictionResult);

    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  predictionService,
};
