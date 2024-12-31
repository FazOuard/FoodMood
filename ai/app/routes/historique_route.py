from flask import Blueprint, request, jsonify, abort
from ..pages.historique import add_interaction_to_historique  
import pandas as pd

historique_bp = Blueprint('historique', __name__)

@historique_bp.route('/historique', methods=['POST'])
def recommend():
    data = request.get_json()  # Lire les données JSON
    print("Données reçues :", data)  # Debug : Affichez les données reçues dans la console
    if not data or 'user_id' not in data or 'plat' not in data:
        return jsonify({"error": "Veuillez fournir un user_id et un plat"}), 400

    user_id = data['user_id']
    plat = data['plat']
    
    try:
        # Ajouter l'interaction à l'historique
        historique = add_interaction_to_historique(user_id, plat)

        # Appeler la fonction de mise à jour de la similarité

        return jsonify(historique)  # Convertir DataFrame en dict pour la réponse
    except Exception as e:
        return jsonify({"error": str(e)}), 500
