import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { FaPizzaSlice } from 'react-icons/fa';
import "./statistique.css";
import NavBar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";

const Statistique = () => {
  const [stats, setStats] = useState(null); // Contient toutes les statistiques (nombre + graphiques)
  const [error, setError] = useState(null);
  const userId = 1; // ID de l'utilisateur à récupérer

  useEffect(() => {
    fetch(`http://localhost:8080/statistique/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des statistiques");
        }
        return response.json();
      })
      .then((data) => {
        setStats({
          totalPlats: data.totalPlats, // Nombre total de plats
          barChart: JSON.parse(data.bar_chart), // Graphique des plats favoris
          cumulativeChart: JSON.parse(data.cumulative_chart), // Graphique cumulatif
        });
      })
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!stats) {
    return <div>Chargement des statistiques...</div>;
  }

  return (
    
    <div className="statistiqueContainer">
         <NavBar/>
         <SideBar/>
      
      <div className="totalPlats">
        <FaPizzaSlice size={24} style={{ width: "30px", color: "#2A2A2A" }} /> {/* Icône */}
        {stats.totalPlats} Plats favoris
      </div>

      
      <div className="graphique1">
        
        <h2>Plats favoris</h2>
        <Plot
          data={stats.barChart.data}
          layout={stats.barChart.layout}
          config={stats.barChart.config || {}}
        />
      </div>

      <div className="graphique2">
        <h2>Évolution cumulative des interactions</h2>
        <Plot
          data={stats.cumulativeChart.data}
          layout={stats.cumulativeChart.layout}
          config={stats.cumulativeChart.config || {}}
        />
      </div>
    </div>
  );
};

export default Statistique;
