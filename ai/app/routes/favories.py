from flask import Blueprint, request, jsonify
from datetime import datetime
from ..database import ApiSQLEngine
import sqlite3

# Création du Blueprint
favorites_bp = Blueprint('favories', __name__)

@favorites_bp.route('/favories', methods=['POST'])
def toggle_favorite():
    data = request.get_json()
    
    # Vérification des données reçues
    if not data or 'user_id' not in data or 'plat' not in data:
        return jsonify({"error": "Veuillez fournir un user_id et un plat"}), 400

    user_id = data['user_id']
    plat = data['plat']
    
    try:
        # Connexion à la base de données
        conn = sqlite3.connect(ApiSQLEngine)  # ou utilise ton moteur de base de données spécifique
        cursor = conn.cursor()

        # Vérifier si le plat est déjà dans les favoris de l'utilisateur
        cursor.execute("SELECT * FROM historique WHERE user_id = ? AND plat = ?", (user_id, plat))
        existing_favorite = cursor.fetchone()

        if existing_favorite:
            # Si un enregistrement existe, on le supprime pour "unlike"
            cursor.execute("DELETE FROM historique WHERE user_id = ? AND plat = ?", (user_id, plat))
            conn.commit()
            conn.close()
            return jsonify({"message": "Plat retiré des favoris", "liked": False})
        
        else:
            # Si l'utilisateur n'a pas encore aimé ce plat, on l'ajoute à l'historique
            cursor.execute("INSERT INTO historique (user_id, plat, date_interaction) VALUES (?, ?, ?)",
                           (user_id, plat, datetime.utcnow()))
            conn.commit()
            conn.close()
            return jsonify({"message": "Plat ajouté aux favoris", "liked": True})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
