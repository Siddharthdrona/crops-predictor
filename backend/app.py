from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# In-memory user store (for demo only; use DB in production)
users = {}

# Load ML model and selector
model = joblib.load("crop_model.pkl")
selector = joblib.load("feature_selector.pkl")

# Soil mappings
soil_types = {
    'loamy': 1, 'sandy': 2, 'clay': 3, 'black': 4,
    'red': 5, 'alluvial': 6, 'laterite': 7, 'peaty': 8
}

soil_crop_map = {
    'loamy': ['wheat', 'sugarcane', 'pulses', 'vegetables'],
    'sandy': ['groundnut', 'bajra', 'watermelon'],
    'clay': ['rice', 'jute'],
    'black': ['cotton', 'soybean', 'sunflower'],
    'red': ['millets', 'pulses', 'groundnut'],
    'alluvial': ['rice', 'maize', 'wheat', 'sugarcane'],
    'laterite': ['tea', 'coffee', 'cashew', 'rubber'],
    'peaty': ['rice', 'jute']
}

fertilizer_suggestions = {
    'loamy': "Balanced NPK (e.g. 10:26:26), FYM, compost",
    'sandy': "Frequent low-dose NPK (especially Nitrogen), compost",
    'clay': "Phosphorus-rich fertilizer, gypsum for aeration",
    'black': "Phosphate + Potash-based fertilizers",
    'red': "Organic compost, lime (to reduce acidity)",
    'alluvial': "Balanced NPK, urea, DAP, compost",
    'laterite': "Lime for pH correction, FYM, zinc & potash",
    'peaty': "Use urea, potassium nitrate, and lime"
}

msp_table = {
    'rice': 2300,
    'maize': 2225,
    'cotton': 6220,
    'coconut': 10000,
    'jowar': 3371,
    'bajra': 2650,
    'pigeonpea': 7350,
    'urad': 7400,
    'moong': 8628,
    'Ragi': 4290,
    'groundnut': 6377,
    'Tur': 7500,
    'Moong': 8628,
    'Urad': 7400,
    'Groundnut': 6377,
    'wheat': 2275,
    'barley': 1900,
    'gram': 6025,
    'safflower': 5700,
    'soybean': 4625,
    'chillies': 6000,
    'onion': 2400,
    'tomato': 800,
    'turmeric': 7500,
    'mango': 1500,
    'banana': 1500,
    'sugarcane': 315,
    'brinjal': 1000,
    'coriander': 600,
    'spinach': 700,
    'cauliflower': 850,
    'cabbage': 600,
    'watermelon': 1200,
    'potato': 1120,
    'jute': 4000,
    'pomegranate': 1500,
}

# 🚀 Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    if username in users:
        return jsonify({'error': 'User already exists'}), 400

    users[username] = generate_password_hash(password)
    return jsonify({'message': 'Registered successfully'}), 200

# 🔐 Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    stored_hash = users.get(username)
    if not stored_hash or not check_password_hash(stored_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({'username': username}), 200

# 🌾 Prediction Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        soil = data.get('soil', 'loamy').lower()
        soil_val = soil_types.get(soil, 0)
        acres = float(data.get('acres', 1))
        water = float(data.get('water', 0))

        input_data = np.array([[float(data['N']), float(data['P']), float(data['K']),
                                float(data['temperature']), float(data['humidity']),
                                float(data['ph']), float(data['rainfall'])]])

        selected = selector.transform(input_data)
        probabilities = model.predict_proba(selected)[0]
        classes = model.classes_
        top_indices = probabilities.argsort()[-5:][::-1]

        preferred_crops = soil_crop_map.get(soil, [])
        prioritized, others = [], []

        for i in top_indices:
            crop = classes[i]
            info = {
                'crop': crop,
                'probability': round(probabilities[i] * 100, 2),
                'msp': msp_table.get(crop.lower(), "N/A")
            }
            if crop.lower() in preferred_crops:
                prioritized.append(info)
            else:
                others.append(info)

        suggestions = prioritized + others
        fertilizer = fertilizer_suggestions.get(soil, "General NPK mix recommended")

        return jsonify({
            'suggestions': suggestions,
            'input': data,
            'fertilizer': fertilizer
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
