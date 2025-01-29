from flask import Blueprint, jsonify, Response
import pandas as pd
import plotly.graph_objects as go
from ..database import ApiSQLEngine
import json
import plotly

statistiquementPlot_bp = Blueprint('statistiquementPlot_bp', __name__)

# Charger les données de la base de données dans un DataFrame
historique = pd.read_sql_query("SELECT * FROM historique", ApiSQLEngine)
@statistiquementPlot_bp.route('/statistiquementPlot')
def trend_graph():
    try:
      
        
        # Prétraitement des données
        df_sorted = historique.sort_values(by='date_interaction')
        

        total_interactions = len(df_sorted)

        df_sorted['interaction_cumulee'] = df_sorted.groupby('user_id').cumcount() + 1


        # Créer un graphique de la tendance cumulative
        fig = go.Figure(data=[go.Scatter(x=df_sorted['date_interaction'].tolist(), 
                                        y=df_sorted['interaction_cumulee'].tolist(), 
                                        mode='lines',
                                        line=dict(color='#3b7a57'))])
       

        # Mise à jour de la mise en page du graphique
        fig.update_layout(
            title="Tendance cumulative des interactions",
            titlefont=dict(size=24, family='Helvetica', color='black', weight='bold'),
            xaxis_title="Date",
            yaxis_title="Interactions Cumulées",
        )
      

        # Convertir fig en dictionnaire et renvoyer en tant que JSON
        fig_dict = fig.to_dict()

        # Vérifie la structure du dictionnaire
      

        response = {
            "figure": fig_dict,
            "total_interactions": total_interactions
        }

        return jsonify(response)  # Retourner le dictionnaire JSON

    except Exception as e:
        print(f"Erreur: {e}")  # Log de l'erreur
        return Response(
            json.dumps({"error": str(e)}),
            mimetype='application/json',
            status=500
        )

