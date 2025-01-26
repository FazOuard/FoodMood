import pandas as pd
import numpy as np
import plotly.graph_objects as go
from ..database import ApiSQLEngine

# Charger les données
data = pd.read_sql_query("SELECT * FROM users_preferences", ApiSQLEngine)
plat = pd.read_sql_query("SELECT * FROM plat", ApiSQLEngine)

# Prétraitement des données
df4 = data.copy()
df4['Plat_prefere'] = df4['Plat_prefere'].str.split(', ')
exploded_df = df4.explode('Plat_prefere')
exploded_df['Plat_prefere'] = exploded_df['Plat_prefere'].str.strip()

# Comptage des plats préférés
dish_counts = exploded_df['Plat_prefere'].value_counts().reset_index()
dish_counts.columns = ['plat', 'count']
dish_counts = dish_counts[dish_counts["count"] > 1]
dish_counts["percentage"] = dish_counts["count"] / dish_counts["count"].sum() * 100

# Création des couleurs et des angles pour le graphique
dish_counts['angle'] = dish_counts['count'] / dish_counts['count'].sum() * 2 * np.pi

# Palette de couleurs plus harmonieuse
palette = [
    '#56B4E9', '#D55E00', '#009E73', '#CC79A7', '#F0E442', '#E69F00', '#0072B2', '#F0A500', 
    '#7F7F7F', '#A9A9A9'
]
dish_counts['color'] = [palette[i % len(palette)] for i in range(len(dish_counts))]

def plot_pie():
    fig = go.Figure(
        data=[go.Pie(
            labels=dish_counts['plat'],  
            values=dish_counts['count'],  
            hoverinfo='label+percent',  
            marker=dict(colors=dish_counts['color']),
            textinfo='percent',  
            textfont=dict(size=14, color='white'), 
            pull=[0.1 if i % 2 == 0 else 0 for i in range(len(dish_counts))],  
            opacity=0.8,  
            domain=dict(x=[0.1, 0.9], y=[0.1, 0.9]) ,
            hole=0.3
        )],
        layout=go.Layout(
            title_font=dict(size=24, family='Arial', color='black'),  
            showlegend=False,  
            margin=dict(t=0, b=0, l=0, r=0),  
            plot_bgcolor='white',  
            paper_bgcolor='white',  
            hoverlabel=dict(
                bgcolor="black", 
                font_size=16, 
                font_family="Arial", 
                font_color="grey"
            ),
            font=dict(family='Arial', size=14, color='black'),  
            autosize=False,
            width=835,
            height=835, 
        )
    )
    
    return fig


