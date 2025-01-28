import pandas as pd
import numpy as np
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Charger les données
data = pd.read_csv("Préférences_Alimentaires.csv")
plat = pd.read_csv("Plats.csv")

def plot_bar():
    genre_counts = data["Genre"].value_counts()

    # Création du subplot avec les spécifications pour les graphiques en camembert
    fig = make_subplots(
        rows=1, 
        cols=2, 
        shared_yaxes=True,
        specs=[[{'type': 'pie'}, {'type': 'pie'}]]  # Définir explicitement le type de graphique pour chaque subplot
    )

    # Ajout du graphique en camembert (pie chart)
    fig.add_trace(
        go.Pie(
            labels=genre_counts.index,  # Labels (Homme et Femme)
            values=genre_counts.values,  # Les valeurs correspondantes
            name="Répartition par Genre",
            marker=dict(colors=["#2C471B", "#88b04b"]),  # Couleurs personnalisées
            hole=0.3,  # Un petit trou au centre pour créer un donut si tu veux
            hoverinfo="label+percent",  # Afficher le label et le pourcentage au survol
            textinfo="percent",  # Afficher les pourcentages à l'intérieur du graphique
        ),
        1, 1  # Ajout du graphique dans la première ligne et la première colonne du subplot
    )

    # Mise à jour du layout pour personnaliser l'apparence
    fig.update_layout(
        showlegend=False,  # Masquer la légende si tu n'en as pas besoin
        height=300,  # Hauteur du graphique
        margin=dict(l=20, r=20, t=20, b=20),  # Marges réduites
        xaxis=dict(showgrid=False),  # Masquer la grille de l'axe X
        yaxis=dict(showgrid=False)   # Masquer la grille de l'axe Y
    )

    return fig
