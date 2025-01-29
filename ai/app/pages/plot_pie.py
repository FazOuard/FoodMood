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

# Palette de couleurs dans la famille des verts
palette = [
    '#2C8A5D', '#66B04F', '#4D8036', '#78C76E', '#A3D38A', '#8DBE5F', '#5A9A3A', '#97D68C',
    '#3C763E', '#A5D7A1'
]
dish_counts['color'] = [palette[i % len(palette)] for i in range(len(dish_counts))]

def plot_pie():
    fig = go.Figure(
        data=[go.Pie(
            labels=dish_counts['plat'],  
            values=dish_counts['count'],  
            hoverinfo='label+percent',  
            marker=dict(colors=dish_counts['color']),
            textinfo='none',  
            textfont=dict(size=14, color='black'), 
            pull=[0.1 if i % 2 == 0 else 0 for i in range(len(dish_counts))],  
            opacity=0.8,  
            domain=dict(x=[0.1, 0.9], y=[0.1, 0.9]),
            hole=0.3
        )],
        layout=go.Layout(
           title=dict(text="Plats préférés des utilisateurs", font=dict(size=24, family='Helvetica', color='black', weight='bold'), x=0.5),
            title_font=dict(size=24, family='Helvetica', color='black', weight='bold'), 
             title_x=0.5,                 # Centrer le titre (valeur de 0 à 1, 0.5 est au centre)
            
            showlegend=True,  
            
            plot_bgcolor='white',  
            paper_bgcolor='white',  
            hoverlabel=dict(
                bgcolor="black", 
                font_size=16, 
                font_family="Arial", 
                font_color="grey"
            ),
            font=dict(family='Arial', size=14, color='black'),
            
        )
    )
    
    return fig
