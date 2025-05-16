from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:3001"]}},
     supports_credentials=True)

# don’t load the model here!
model = None  

class_indices = {
    "Bacterial Pneumonia": 0,
    "Corona Virus Disease": 1,
    "Normal": 2,
    "Tuberculosis": 3,
    "Viral Pneumonia": 4
}
classes = {v: k for k, v in class_indices.items()}

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ Model API is running!"})

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "GET":
        return jsonify({"message": "Send a POST with an image file"}), 200
    if "file" not in request.files:
        app.logger.debug("request.files keys: %s", list(request.files.keys()))
        return jsonify({"error": "No file uploaded"}), 400

    img = Image.open(io.BytesIO(request.files["file"].read())).convert("RGB")
    img = img.resize((224, 224))
    arr = np.expand_dims(np.array(img) / 255.0, 0)

    preds = model.predict(arr)[0]
    idx = int(np.argmax(preds))
    return jsonify({
        "prediction": classes[idx],
        "confidence": float(preds[idx])
    })

if __name__ == "__main__":
    # Load exactly once, before Flask runs
    model = tf.keras.models.load_model("densenet201.hdf5", compile=False)
    print("✅ Model loaded successfully!")
    # Turn off the reloader so we don’t fork again
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
