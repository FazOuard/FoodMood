import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { FaPizzaSlice } from "react-icons/fa";
import { MdOutlineTimeline, MdFavorite } from "react-icons/md";
import "./statistique.css";
import NavBar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const Statistique = () => {
  const [stats, setStats] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [error, setError] = useState(null);
  const [extraDataCount, setExtraDataCount] = useState(null);
  const location = useLocation();
  const state = location.state || {};
  const userId = state?.iduser || 1;
  const navigate = useNavigate();

  const goToAllDishes = () => {
    navigate("/plats");
  };

  useEffect(() => {
    fetch(`http://localhost:8081/statistique/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Aucune statistique disponible");
        }
        return response.json();
      })
      .then((data) => {
        setStats({
          totalPlats: data.totalPlats,
          plats: data.plats,
          barChart: data.bar_chart ? JSON.parse(data.bar_chart) : null,
          cumulativeChart: data.cumulative_chart
            ? JSON.parse(data.cumulative_chart)
            : null,
        });
      })
      .catch(() => {
        setStats({
          totalPlats: 0,
          plats: [],
          barChart: null,
          cumulativeChart: null,
        });
      });

    fetch(`http://localhost:5000/data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données supplémentaires");
        }
        return response.json();
      })
      .then((data) => {
        setExtraData(data);
        setExtraDataCount(data.length);
      })
      .catch(() => {
        setExtraData([]);
        setExtraDataCount(0);
      });
  }, [userId]);

  return (
    <div className="statistiqueContainer">
      <NavBar />
      <SideBar />

      <div className="totalTOUTPlats">
        <div className="totalPlats">
          <MdFavorite className="blockFaz-icon" />
          {stats?.totalPlats} Plats favoris
        </div>
        <div className="totalPlats" onClick={goToAllDishes}>
          <FaPizzaSlice className="blockFaz-icon" />
          {extraDataCount} Plats
        </div>
      </div>

      <div className="bothgraphiques">
        <div className="graphique1">
          {stats?.barChart ? (
            <Plot
              data={stats.barChart.data}
              layout={stats.barChart.layout}
              config={stats.barChart.config || {}}
            />
          ) : (
            <p>📊 Oups ! On dirait que tu n’as pas encore d’historique... 🍕<br/> Commence à explorer de délicieux plats pour voir tes statistiques ici !</p>
          )}
        </div>

        <div className="graphique2">
          {stats?.cumulativeChart ? (
            <Plot
              data={stats.cumulativeChart.data}
              layout={stats.cumulativeChart.layout}
              config={stats.cumulativeChart.config || {}}
            />
          ) : (
            <p>📈 Pas encore de données à afficher !🌟  <br/>Plus tu découvres de plats, plus tes statistiques se rempliront !</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistique;
