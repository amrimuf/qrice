import os
import numpy as np
from tensorflow import keras
from PIL import Image
from google.cloud import storage
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

# Specify your GCS bucket name and image bucket name
bucket_name = 'env-prod'
images_bucket_name = 'q-rice'

model_filename = 'model-rice-diseases.h5'
model_path = f'gs://{bucket_name}/{model_filename}'

# Create a client for interacting with the GCS API
storage_client = storage.Client.from_service_account_json('./service-account-key.json')

# Create the directory if it doesn't exist
os.makedirs('/tmp/', exist_ok=True)

# Download the model file to a temporary location
temp_model_path = f'/tmp/{model_filename}'
model_blob = storage_client.get_bucket(bucket_name).blob(model_filename)
model_blob.download_to_filename(temp_model_path)

# Load the model from the H5 file
model = keras.models.load_model(temp_model_path, compile=False)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

app = Flask(__name__)
api = Api(app)
CORS(app)

class PredictResource(Resource):
    def post(self):
        # Get the image filename from the request payload
        image_filename = request.json['imageFilename']
        
        # Specify the path to your image file in the bucket
        image_path = f'gs://{images_bucket_name}/{image_filename}'
        
        # Download the image file to a temporary location
        temp_image_path = f'/tmp/{image_filename}'
        blob = storage_client.get_bucket(images_bucket_name).blob(image_filename)
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
        class_labels = ['Bacterial Leaf Blight', 'Brown Spot', 'Healthy', 'Leaf Blast', 'Leaf Scald', 'Narrow Brown Spot']
        predicted_label = class_labels[predicted_class]
    
        # Prepare the response
        response = {'prediction': predicted_label}
    
        return jsonify(response)

api.add_resource(PredictResource, '/')

def main(request):
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

if __name__ == '__main__':
    main(None)