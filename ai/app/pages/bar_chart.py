import pandas as pd
import numpy as np
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Charger les données
data = pd.read_csv("Préférences_Alimentaires.csv")
plat = pd.read_csv("Plats.csv")


def plot_bar():
    genre_counts = data["Genre"].value_counts()

    fig = make_subplots(rows=1, cols=2, shared_yaxes=True)

    fig.add_trace(
        go.Bar(
            x=genre_counts.index,  # "Homme" et "Femme"
            y=genre_counts.values,  # Le nombre correspondant
            name="Répartition par Genre",
            marker=dict(color=["#CC79A7", "#56B4E9"])  
        ),
        1, 1
    )

    fig.update_layout(
        
        xaxis_title="Genre",
        yaxis_title="Nombre",
        showlegend=False
    )

    return fig
