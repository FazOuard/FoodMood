from flask import Flask
from .routes.recommendations import recommendation_bp
from .routes.plot import plot_bp
from .routes.bar_chart import bar_bp
from .routes.recommended_preferences_route import recommendationPreferences_bp
from .routes.model_new_route import recommend_bp
from .routes.historique_route import historique_bp

from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app)

    app.register_blueprint(recommendation_bp)
    app.register_blueprint(plot_bp)
    app.register_blueprint(bar_bp)
    app.register_blueprint(recommendationPreferences_bp)
    app.register_blueprint(recommend_bp)
    app.register_blueprint(historique_bp)


    return app
