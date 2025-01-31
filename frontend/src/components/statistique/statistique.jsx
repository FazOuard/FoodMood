import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { FaPizzaSlice } from "react-icons/fa";
import { MdOutlineTimeline,MdFavorite  } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import "./statistique.css";
import NavBar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const Statistique = () => {
  const [stats, setStats] = useState(null); 
  const [extraData, setExtraData] = useState(null); // Pour les données du deuxième fetch
  const [error, setError] = useState(null);
  const [extraDataCount, setExtraDataCount] = useState(null);
  const location = useLocation();
  const state = location.state || {};
  const userId =  state?.iduser || 1;
  const navigate = useNavigate();

  const goToAllDishes = () => { 
    navigate("/plats");
    }
  useEffect(() => {
    // Premier fetch
    fetch(`http://localhost:8081/statistique/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des statistiques");
        }
        return response.json();
      })
      .then((data) => {
        setStats({
          totalPlats: data.totalPlats,
          plats: data.plats,
          barChart: JSON.parse(data.bar_chart),
          cumulativeChart: JSON.parse(data.cumulative_chart),
        });
      })
      .catch((err) => setError(err.message));

    // Deuxième fetch
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
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!stats || !extraData) {
    return <div>Chargement des statistiques...</div>;
  }

  return (
    <div className="statistiqueContainer">
      <NavBar />
      <SideBar />
      
      <div className="totalTOUTPlats">
        <div className="totalPlats">
            <MdFavorite  className="blockFaz-icon"  />
            {stats.totalPlats} Plats favoris
        </div>
        <div className="totalPlats" onClick={goToAllDishes}>
            <FaPizzaSlice className="blockFaz-icon"  />
            {extraDataCount} Plats
        </div>
        </div>
      <div className="bothgraphiques">
        <div className="graphique1">
          
          <Plot
            data={stats.barChart.data}
            layout={stats.barChart.layout}
            config={stats.barChart.config || {}}
          />
        </div>
          
      
        <div className="graphique2">
          
          <Plot
            data={stats.cumulativeChart.data}
            layout={stats.cumulativeChart.layout}
            config={stats.cumulativeChart.config || {}}
          />
        </div>

      </div>
      
    </div>
  );
};

export default Statistique;
