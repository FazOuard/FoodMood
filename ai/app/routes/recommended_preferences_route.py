from flask import Blueprint, request, jsonify
import pickle
import pandas as pd
import numpy as np

recommendationPreferences_bp = Blueprint('recommendationPreferences_bp', __name__)

# Load the model
with open('C:/Users/asus/OneDrive/Desktop/foodMood/ai/app/pages/svd_model.pkl', 'rb') as f:
    algo = pickle.load(f)

@recommendationPreferences_bp.route('/recommendationPreference', methods=['POST'])
def recommend():
    if request.is_json:
        data = request.get_json()
        user_id = data['user_id']
        product_id = data['product_id']
        
        # Predict the rating
        pred = algo.predict(user_id, product_id)
        
        return jsonify({'user_id': user_id, 'product_id': product_id, 'rating': pred.est})
    else:
        return jsonify({"error": "Unsupported Media Type"}), 415