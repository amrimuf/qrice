import os
import numpy as np
from tensorflow import keras
from PIL import Image
from google.cloud import storage
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

bucket_name = 'q-rice'

app = Flask(__name__)
api = Api(app)
CORS(app)

class PredictResource(Resource):
    def post(self):
        # Get the model name and image filename from the request payload
        model_name = request.json['model']
        image_filename = request.json['imageFilename']
        
        # Assign the appropriate model filename based on the requested model
        if model_name == 'riceDisease':
            model_filename = 'model-rice-diseases.h5'
        elif model_name == 'nutrientDeficiency':
            model_filename = 'model-nutrient-deficiency.h5'
        elif model_name == 'riceVariety':
            model_filename = 'model-rice-variety.h5'
        elif model_name == 'seedQuality':
            model_filename = 'model-seed-quality.h5'
        else:
            return jsonify({'error': 'Invalid model name'})

        # Create a client for interacting with the GCS API
        storage_client = storage.Client.from_service_account_json('./service-account-key.json')

        # Create the directory if it doesn't exist
        os.makedirs('/tmp/', exist_ok=True)

        # Download the model file to a temporary location
        temp_model_path = f'/tmp/{model_filename}'
        model_blob = storage_client.get_bucket(bucket_name).blob( 'models/' + model_filename)
        model_blob.download_to_filename(temp_model_path)

        # Load the model from the H5 file
        model = keras.models.load_model(temp_model_path, compile=False)
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

        # Download the image file to a temporary location
        temp_image_path = f'/tmp/{image_filename}'
        blob = storage_client.get_bucket(bucket_name).blob('images/' + image_filename)
        blob.download_to_filename(temp_image_path)
        
        # Load the image and preprocess it
        img = Image.open(temp_image_path)
        img = img.resize((250, 250))  # Resize the image to match the expected input shape
        x = np.array(img)  # Convert the image to a NumPy array
        x = np.expand_dims(x, axis=0)  # Add an extra dimension to match the model's input shape
    
        # Perform the prediction using the loaded model
        prediction = model.predict(x)
        predicted_class = np.argmax(prediction)
    
        # Map the predicted class to the corresponding label
        class_labels = {
            'riceDisease': ['Bacterial Leaf Blight', 'Brown Spot', 'Healthy', 'Leaf Blast', 'Leaf Scald', 'Narrow Brown Spot'],
            'nutrientDeficiency': ['Nitrogen', 'Phosphorus', 'Potassium'],
            'riceVariety': ['Arborio', 'Basmati', 'Ipsala', 'Jasmine', 'Karacadag'],
            'seedQuality': ['Healthy', 'Unhealthy']
        }
        class_labels = class_labels.get(model_name)
        if class_labels is None:
            return jsonify({'error': 'Invalid model name'})
        
        predicted_label = class_labels[predicted_class]

        # Prepare the response
        response = {'prediction': predicted_label}

        return jsonify(response)

api.add_resource(PredictResource, '/')

def main(request):
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

if __name__ == '__main__':
    main(None)