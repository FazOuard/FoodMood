from flask import Blueprint, request, jsonify
import pandas as pd
from ..pages.historique import get_user_historique  # Importer la fonction

gethistorique_bp = Blueprint('toutHistorique', __name__)

@gethistorique_bp.route('/toutHistorique', methods=['GET'])
def get_historique():
    # Lire les paramètres de la requête
    user_id = request.args.get('user_id', type=int)  # Récupérer le user_id depuis les paramètres
    
    if user_id is None:
        return jsonify({"error": "Veuillez fournir un user_id valide."}), 400

    try:
        # Appeler la fonction pour récupérer l'historique
        result = get_user_historique(user_id)

        if result is not None:
            return jsonify({"user_id": user_id, "last_interaction_id": result}), 200
        else:
            return jsonify({"message": f"Aucune interaction trouvée pour l'utilisateur {user_id}."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
