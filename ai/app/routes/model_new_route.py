from flask import Blueprint, request, jsonify
from ..pages.model_new import plat_recommended, hybrid_recommendations
from ..pages.historique import get_user_historique
from ..database import ApiSQLEngine
import pandas as pd

plat = pd.read_sql_query("SELECT * FROM plat", ApiSQLEngine)

recommend_bp = Blueprint('recommend', __name__)

@recommend_bp.route('/recommend', methods=['POST'])
def get_hybrid_recommendations():
    data = request.get_json()  
    print("Données reçues :", data)

    if not data or 'user_id' not in data:
        return jsonify({"error": "User ID is required!"}), 400

    user_id = data['user_id']
    
    try:
        print("Loading plat table...")

        # Vérifier l'historique utilisateur
        item_id = get_user_historique(user_id)
        print("Retrieved item_id:", item_id)

        if item_id is not None and item_id in plat['id'].values:
            print("Envoi à hybrid_recommendations:", plat.shape, user_id, item_id)
            recommendations = hybrid_recommendations(plat, user_id, item_id)
        else:
            print("⚠️ Aucun historique trouvé ou item_id invalide, utilisation de la recommandation collaborative.")
            
            # Ajout d'une gestion d'erreur pour éviter le plantage
            try:
                recommendations = plat_recommended(user_id)
            except Exception as e:
                print("❌ Erreur dans plat_recommended:", str(e))
                recommendations = []  # Retourner une liste vide au lieu d'une erreur

        return jsonify(recommendations if isinstance(recommendations, list) else recommendations.to_dict(orient='records'))

    except Exception as e:
        print("❌ Error occurred:", str(e))  
        return jsonify({"error": str(e)}), 500
