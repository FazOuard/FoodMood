
import "./PlanMonth.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import cross from '../../assets/icons/cross.png';
import replace from '../../assets/replace/replace.png'
const PlanMonth = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [taskInput, setTaskInput] = useState("");

  // Helper to get month days
  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill(null)
      .map((_, index) => new Date(year, month, index + 1))
      .filter((date) => date.getMonth() === month);
  };

  const days = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Change month
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Handle task addition
  const handleAddTask = () => {
    if (selectedDay && taskInput) {
      setTasks({
        ...tasks,
        [selectedDay]: [...(tasks[selectedDay] || []), taskInput],
      });
      setTaskInput("");
      setSelectedDay(null);
    }
  };

  return (
  
    <div className="plan-month">
       <NavBar/>
       <SideBar/>
       <div className='planifierMonth0'>
      <header className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h1>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h1>
        <button onClick={handleNextMonth}>&gt;</button>
      </header>
      <div className="calendar">
        <div className="day-names">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
        <div className="days">
          {days.map((day) => (
            <div
              key={day.toDateString()}
              className="day"
              onClick={() => setSelectedDay(day.toDateString())}
            >
              <span>{day.getDate()}</span>
              <div className="tasks">
                {(tasks[day.toDateString()] || []).map((task, index) => (
                  <div key={index} className="task">
                    {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              Ajouter le nom du plats{" "}
              {new Date(selectedDay).toLocaleDateString()}
            </h2>
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Entrez vos pltas."
            ></textarea>
            <button onClick={handleAddTask}>Ajouter</button>
            <button onClick={() => setSelectedDay(null)}>Annuler</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PlanMonth;
