from flask import Blueprint, request, jsonify
from ..pages.historique import delete_interaction_by_id  

historiqueDelete_bp = Blueprint('deleteHistorique', __name__)

@historiqueDelete_bp.route('/deleteHistorique', methods=['DELETE'])
def delete_historique():
    # Lire les données JSON
    data = request.get_json()
    print("Données reçues :", data)  # Debug : Afficher les données reçues dans la console

    # Vérifier si les données et l'ID sont présents
    if not data or 'id' not in data:
        return jsonify({"error": "Veuillez fournir un id"}), 400

    # Récupérer l'ID depuis les données JSON
    interaction_id = data['id']

    try:
        # Supprimer l'interaction à partir de l'ID
        result = delete_interaction_by_id(interaction_id)

        # Si aucune interaction n'a été supprimée, retourner une erreur
        if result is None:
            return jsonify({"error": f"Aucune interaction trouvée pour l'ID {interaction_id}"}), 404

        # Retourner une réponse de succès
        return jsonify({"message": f"Interaction avec l'ID {interaction_id} supprimée avec succès"}), 200

    except Exception as e:
        # Gestion des exceptions
        return jsonify({"error": str(e)}), 500
