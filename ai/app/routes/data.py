from flask import Blueprint, request, jsonify, abort
import pandas as pd
data_bp = Blueprint('data', __name__)


@data_bp.route('/api/data', methods=['GET'])
def get_data():
    # Exemple de données pour le dashboard
    df = pd.read_csv('Préférences_Alimentaires.csv')
    
    # Convertir les données en liste de dictionnaires
    data = df.to_dict(orient='records')
    return jsonify(data)

