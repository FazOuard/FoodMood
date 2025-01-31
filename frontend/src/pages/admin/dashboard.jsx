import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './dashboard.css';
import { FaRegUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { SiFoodpanda } from "react-icons/si";
import plat from "../../assets/image/plat.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import couscous from "../../assets/image/couscous.jpg";

const PlotComponent = () => {
  const [plot1, setPlot1] = useState({ data: [], layout: {} });
  const [plot2, setPlot2] = useState({ data: [], layout: {} });
  const [plot3, setPlot3] = useState({ data: [], layout: {} });
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [error, setError] = useState(null);
  const [extraData, setExtraData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [nombrePlat, setNombrePlat] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [usersData, setUsersData] = useState(0);

  const userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les plots
        const plotResponse = await fetch('http://localhost:8081/plot');
        const plotData = await plotResponse.json();
        setPlot1(plotData);
        setLoading1(false);

        const barPlotResponse = await fetch('http://localhost:8081/barPlot');
        const barPlotData = await barPlotResponse.json();
        setPlot2(barPlotData);
        setLoading2(false);

        const statistiquementPlotResponse = await fetch('http://localhost:8081/statistiquementPlot');
        const statistiquementPlotData = await statistiquementPlotResponse.json();
        setPlot3(statistiquementPlotData.figure);
        setTotalInteractions(statistiquementPlotData.total_interactions);
        setLoading3(false);

        // Récupérer le nombre de plats et les autres données supplémentaires
        const extraDataResponse = await fetch('http://localhost:5000/data');
        const extraData = await extraDataResponse.json();
        setExtraData(extraData);
        setNombrePlat(extraData.length);

        // Récupérer le nombre de plats et les autres données supplémentaires
        const usersResponse = await fetch('http://localhost:5000/userWithPreferences');
        const usersData = await usersResponse.json();
        setUsersData(usersData.length);
       


      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [userId]);

  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = extraData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(extraData.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-containerFaz">
      <div className='blocksFaz'>
        <div className="blockFaz block1">
        <FaRegUser className="blockFaz-icon" />
          <span className="blockFaz-number">{usersData}</span>
          <br />
          <span className="blockFaz-text">
            Utilisateurs 
          </span>
        </div>
        <div className="blockFaz block2">
        <IoFastFoodOutline className="blockFaz-icon" />
          <span className="blockFaz-number">{nombrePlat}</span>
          <br />
          <span className="blockFaz-text">
            Plats 
          </span>
        </div>
        <div className="blockFaz block3">
        <SiFoodpanda className="blockFaz-icon" />
          <span className="blockFaz-number">{totalInteractions}</span>
          <br />
          <span className="blockFaz-text">
          Interactions 
          </span>
        </div>
        
      </div>

      <div className="tableauFaz">
        <table className="data-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Duree</th>
              <th>Calories</th>
              <th>Proteines</th>
              <th>Lipides</th>
              <th>Glucides</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.Titre}</td>
                <td>{item.Duree}</td>
                <td>{item.Calories}</td>
                <td>{item.Proteines}</td>
                <td>{item.Lipides}</td>
                <td>{item.Glucides}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}><FaArrowLeft /></button>
        <span>{currentPage} sur {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}><FaArrowRight /></button>
      </div>

      <div className="graphiqueFaz">
        {loading3 ? <p>Loading plot 3...</p> : <Plot data={plot3.data || []} layout={plot3.layout || {}} />}
      </div>




      <div className="chart-containerFaz">
        <div className="chartFaz2">
            <h2 className='textFazH2'>La répartition en genre <br/> de nos utilisateurs</h2>
        </div>
        <div className="chartFaz2">
          {loading2 ? <p>Loading plot 2...</p> : <Plot data={plot2.data || []} layout={plot2.layout || {}} />}
        </div>
        
      </div>
     <br/>
     <br/>
     <br/>
      <div className="chart-containerFaz">
        
        <div className="ImageContainerFaz">
        <div className="imageFaz">
          <img src={couscous} alt="couscous" />
          <div className="overlay"></div>

          
        </div>
        
        
      </div>
      <div className="chartFaz">
          {loading2 ? <p>Loading plot 2...</p> : <Plot data={plot1.data || []} layout={plot1.layout || {}} />}
        </div>
      </div>


      
      

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default PlotComponent;
