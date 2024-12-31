from flask import Blueprint, request, jsonify
from ..pages.model_new import plat_recommended, hybrid_recommendations
from ..pages.historique import get_user_historique
import pandas as pd

plat = pd.read_csv('plat v3.tsv', delimiter='\t')
recommend_bp = Blueprint('recommend', __name__)

@recommend_bp.route('/recommend', methods=['POST'])
def get_hybrid_recommendations():
    data = request.get_json()  # Lire les données JSON
    print("Données reçues :", data)
    
    if not data or 'user_id' not in data:
        return jsonify({"error": "User ID is required!"}), 400

    user_id = data['user_id']
    
    try:
        # Use the get_user_historique function to retrieve the user's history and item_id
        item_id = get_user_historique(user_id)
        
        # Get hybrid recommendations
        recommendations = hybrid_recommendations(plat, user_id, item_id)
        
        # Return recommendations as JSON
        return jsonify(recommendations.to_dict(orient='records'))
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
