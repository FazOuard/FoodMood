from flask import Flask,Blueprint, send_file, jsonify,Response
import plotly
import json
from ..pages.plot_pie import plot_pie 
plot_bp = Blueprint('plot', __name__)

@plot_bp.route('/plot', methods=['GET'])
def get_plot():
    try:
        fig = plot_pie()
        graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
        return Response(graphJSON, mimetype='application/json')
    except Exception as e:
        print(f"Error in get_plot: {e}")
        return Response(
            json.dumps({"error": str(e)}),
            mimetype='application/json',
            status=500
        )