from flask import Blueprint, jsonify, Response
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime
from ..database import ApiSQLEngine
import json
import plotly

statistique_bp = Blueprint('statistique_bp', __name__)
plat = pd.read_sql_query("SELECT * FROM plat", ApiSQLEngine)
# Charger les données de la base de données dans un DataFrame
historique = pd.read_sql_query("SELECT * FROM historique", ApiSQLEngine)

@statistique_bp.route('/statistique/<int:user_id>', methods=['GET'])
def plot_historique(user_id):
    try:
        # Filtrer les interactions de l'utilisateur
        historique_user = historique[historique['user_id'] == user_id]

        # Vérifier si l'utilisateur a des interactions
        if historique_user.empty:
            return jsonify({"error": f"Aucune donnée trouvée pour l'utilisateur {user_id}"}), 404

        # Nombre total de plats
        total_plats = historique_user['plat'].nunique()
        titre=historique_user['plat']

        # Convertir les dates au format datetime (si ce n'est pas déjà fait)
        historique_user['date_interaction'] = pd.to_datetime(historique_user['date_interaction'])

        # === 1er graphique : Barres des plats favoris ===
        plats_count = (
            historique_user.groupby('plat')
            .size()
            .reset_index(name='count')
        )
        fig1 = go.Figure(
            data=[
                go.Bar(
                    x=plats_count['plat'],
                    y=plats_count['count'],
                    marker=dict(color='#3b7a57')  # Barres en vert
                )
            ]
        )
        fig1.update_layout(
            
            xaxis_title="Plats",
            yaxis_title="Nombre d'Interactions",
        )

        # === 2ème graphique : Tendance cumulative des interactions ===
        historique_user_sorted = historique_user.sort_values('date_interaction')
        historique_user_sorted['interaction_cumulee'] = (
            historique_user_sorted.groupby('user_id').cumcount() + 1
        )
        fig2 = go.Figure(
            data=[
                go.Scatter(
                    x=historique_user_sorted['date_interaction'],
                    y=historique_user_sorted['interaction_cumulee'],
                    mode='lines',  # Ligne continue
                    line=dict(color='#3b7a57')  # Ligne bleue
                )
            ]
        )
        fig2.update_layout(
           
            xaxis_title="Date",
            yaxis_title="Interactions Cumulées",
        )

        # === Convertir les deux graphiques en JSON ===
        graphs = {
            "totalPlats": total_plats,  
            "plats": titre.to_list(),
            "bar_chart": json.dumps(fig1, cls=plotly.utils.PlotlyJSONEncoder),
            "cumulative_chart": json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder),
        }

        # Retourner les deux graphiques sous forme de réponse JSON
        return jsonify(graphs)

    except Exception as e:
        # Gérer les erreurs et retourner une réponse avec un code 500
        return Response(
            json.dumps({"error": str(e)}),
            mimetype='application/json',
            status=500
        )
