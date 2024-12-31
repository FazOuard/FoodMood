from flask import Blueprint, request, jsonify, abort
from ..pages.food_recommendations import food_recommended_output  

recommendation_bp = Blueprint('recommendation', __name__)

@recommendation_bp.route('/recommendation', methods=['GET', 'POST'])
def recommendation():
    try:
        Âge = float(request.form.get('Âge', 0))  
        Genre = request.form.get('Genre', "Unknown")
        Statut = request.form.get('Statut', "Unknown")
        Aimer_Plat_marocain = request.form.get('Aimer_Plat_marocain', "No")
        type_cuisine = request.form.get('type_cuisine', "Unknown")
        Poids = float(request.form.get('Poids ', 0))  
        Taille = float(request.form.get('Taille ', 0)) 
        duree_preparation = request.form.get('duree_preparation', "Unknown")
        Sport_question = request.form.get('Sport_question', "No")
        regime_question = request.form.get('regime_question', "No")
        Plat_consome = request.form.get('Plat_consome', "Unknown")
    except ValueError as e:
        print(f"ValueError: {e}")
        abort(400, description="Invalid input data")

    input_features = [
        Âge, Genre, Statut, Aimer_Plat_marocain, type_cuisine,
        Poids, Taille, duree_preparation, Sport_question,
        regime_question, Plat_consome
    ]

    recommendations = food_recommended_output(input_features)
    if not isinstance(recommendations, (list, dict)):
        abort(500, description="Invalid recommendations format")
    
    return jsonify({'recommendations': recommendations})
