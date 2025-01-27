from flask import Blueprint, request, jsonify
from ..pages.historique import delete_interaction  # Importer la fonction modifiée

historiqueDelete_bp = Blueprint('deleteHistorique', __name__)

@historiqueDelete_bp.route('/deleteHistorique', methods=['DELETE'])
def delete_historique():
    # Lire les données JSON
    data = request.get_json()
    print("Données reçues :", data)  # Debug : Afficher les données reçues dans la console

    # Vérifier si les données nécessaires (user_id et plat) sont présentes
    if not data or 'user_id' not in data or 'plat' not in data:
        return jsonify({"error": "Veuillez fournir 'user_id' et 'plat'"}), 400

    # Récupérer le user_id et plat depuis les données JSON
    user_id = data['user_id']
    plat = data['plat']

    try:
        # Supprimer l'interaction à partir du user_id et plat
        result = delete_interaction(user_id, plat)

        # Si aucune interaction n'a été supprimée, retourner une erreur
        if result is None:
            return jsonify({"error": f"Aucune interaction trouvée pour user_id {user_id} et plat '{plat}'"}), 404

        # Retourner une réponse de succès
        return jsonify({"message": f"Interaction pour user_id {user_id} et plat '{plat}' supprimée avec succès"}), 200

    except Exception as e:
        # Gestion des exceptions
        return jsonify({"error": str(e)}), 500
