from flask import Blueprint, request, jsonify
from ..pages.model_new import plat_recommended, hybrid_recommendations
from ..pages.historique import get_user_historique
from ..database import ApiSQLEngine
import pandas as pd

plat = pd.read_sql_query("SELECT * FROM plat", ApiSQLEngine)

recommend_bp = Blueprint('recommend', __name__)
@recommend_bp.route('/recommend', methods=['POST'])
def get_hybrid_recommendations():
    data = request.get_json()  # Lire les données JSON
    print("Données reçues :", data)
    
    if not data or 'user_id' not in data:
        return jsonify({"error": "User ID is required!"}), 400

    user_id = data['user_id']
    
    try:
        # Debugging
        print("Loading plat table...")

        # Check user historique and get item_id
        item_id = get_user_historique(user_id)
        print("Retrieved item_id:", item_id)

        # Check if item_id is valid
        if item_id is None:
            return jsonify({"error": "No historique found for this user"}), 404
        
        # Validate that item_id is valid for recommendations (not related to the plat table)
        if item_id not in plat['id'].values:
            print(f"Item ID {item_id} not found in plat table.")
            return jsonify({"error": f"Item ID {item_id} not found in plat table"}), 404

        # Get hybrid recommendations
        print("Sending to hybrid_recommendations:", plat.shape, user_id, item_id)
        recommendations = hybrid_recommendations(plat, user_id, item_id)

        # Return recommendations as JSON
        return jsonify(recommendations.to_dict(orient='records'))

    except Exception as e:
        print("❌ Error occurred:", str(e))  # Log error in the terminal
        return jsonify({"error": str(e)}), 500
