import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './dashboard.css';
import { FaRegUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { SiFoodpanda } from "react-icons/si";

const PlotComponent = () => {
  const [plot1, setPlot1] = useState({ data: [], layout: {} }); 
  const [plot2, setPlot2] = useState({ data: [], layout: {} }); 
  const [loading1, setLoading1] = useState(true); 
  const [loading2, setLoading2] = useState(true); 

  useEffect(() => {
    fetch('http://localhost:5000/plot')
      .then(res => res.json())
      .then(data => {
        setPlot1(data);
        setLoading1(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/barPlot') 
      .then(res => res.json())
      .then(data => {
        setPlot2(data);
        setLoading2(false);
      });
  }, []);

 
  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  return (

      <div className="dashboard-containerFaz">
        <div className='blocksFaz'>
          <div className="blockFaz block1"><FaRegUser />  315 Utilisateurs</div>
          <div className="blockFaz block2"><IoFastFoodOutline /> 175 plats</div>
          <div className="blockFaz block3"><SiFoodpanda />     175 plats</div>
        </div>
        <div className="chart-containerFaz">
          <div className="plotFaz">
         
            <Plot data={plot1.data || []} layout={plot1.layout || {}} />
          </div>
          <div className="plotFaz">
           
            <Plot data={plot2.data || []} layout={plot2.layout || {}} />
          </div>
        </div>
      </div>

    
  );
};

export default PlotComponent;