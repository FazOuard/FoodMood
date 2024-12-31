from flask import Flask,Blueprint, send_file, jsonify,Response
import plotly
import json
from ..pages.bar_chart import plot_bar
bar_bp = Blueprint('barPlot', __name__)

@bar_bp.route('/barPlot', methods=['GET'])
def get_bar():
    try:
        fig = plot_bar()
        graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        return Response(graphJSON, mimetype='application/json')
    except Exception as e:
        print(f"Error in get_plot: {e}")
        return Response(
            json.dumps({"error": str(e)}),
            mimetype='application/json',
            status=500
        )