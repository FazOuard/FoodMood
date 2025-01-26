from flask import Flask
from .routes.recommendations import recommendation_bp
from .routes.plot import plot_bp
from .routes.bar_chart import bar_bp
from .routes.model_new_route import recommend_bp
from .routes.historique_route import historique_bp
from .routes.data import data_bp
from .routes.statistiques import statistique_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app)

    app.register_blueprint(recommendation_bp)
    app.register_blueprint(plot_bp)
    app.register_blueprint(bar_bp)
    app.register_blueprint(recommend_bp)
    app.register_blueprint(historique_bp)
    app.register_blueprint(data_bp)
    app.register_blueprint(statistique_bp)

    
    return app
