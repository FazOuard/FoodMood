import "./PlanMonth.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import { useLocation, useNavigate } from 'react-router-dom';

const PlanMonth = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [plats, setPlats] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // État pour le champ de recherche
  
  const location = useLocation();
  const state = location.state || {};

  const iduser = state?.iduser || 327;
  
  // Helper to get month days
  const getDaysInMonth = (year, month) => {
    return Array.from({ length: 31 }, (_, index) => new Date(year, month, index + 1))
      .filter((date) => date.getMonth() === month);
  };

  const days = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  // Fetch plats from your API or database
  useEffect(() => {
    axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setPlats(response.data.filter((plat) => plat.Image != null));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search
  const filteredPlats = plats.filter((plat) =>
    plat.Titre.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Handle task addition via drag-and-drop
  const handleDrop = (event, day, category) => {
    event.preventDefault();
    if (draggedItem) {
      const dayTasks = tasks[day] || { breakfast: [], lunch: [], dinner: [] };
      const updatedCategoryTasks = [...dayTasks[category], draggedItem];

      setTasks({
        ...tasks,
        [day]: {
          ...dayTasks,
          [category]: updatedCategoryTasks,
        },
      });

      setDraggedItem(null);
    }
  };

  // Handle drag start
  const handleDragStart = (event, item) => {
    setDraggedItem(item);
  };

  // Handle task removal
  const handleRemoveTask = (day, category, index) => {
    const dayTasks = tasks[day];
    if (!dayTasks) return;

    const updatedCategoryTasks = dayTasks[category].filter(
      (_, i) => i !== index
    );

    setTasks({
      ...tasks,
      [day]: {
        ...dayTasks,
        [category]: updatedCategoryTasks,
      },
    });
  };

  return (
    <div className="plan-month">
      <NavBar />
      <SideBar />
      <div className="planifierMonth0">
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
                  {tasks[day.toDateString()] && (
                    <>
                      <div>
                        <strong>Petit-déjeuner :</strong>
                        {tasks[day.toDateString()].breakfast?.map(
                          (task, index) => (
                            <div key={index} className="task">
                              {task}{" "}
                              <button
                                className="remove-task"
                                onClick={() =>
                                  handleRemoveTask(day.toDateString(), "breakfast", index)
                                }
                              >
                                ✖
                              </button>
                            </div>
                          )
                        )}
                      </div>
                      <div>
                        <strong>Déjeuner :</strong>
                        {tasks[day.toDateString()].lunch?.map((task, index) => (
                          <div key={index} className="task">
                            {task}{" "}
                            <button
                              className="remove-task"
                              onClick={() =>
                                handleRemoveTask(day.toDateString(), "lunch", index)
                              }
                            >
                              ✖
                            </button>
                          </div>
                        ))}
                      </div>
                      <div>
                        <strong>Dîner :</strong>
                        {tasks[day.toDateString()].dinner?.map((task, index) => (
                          <div key={index} className="task">
                            {task}{" "}
                            <button
                              className="remove-task"
                              onClick={() =>
                                handleRemoveTask(day.toDateString(), "dinner", index)
                              }
                            >
                              ✖
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedDay && (
          <div className="drag-drop-zone">
            <h3>
              Glissez-déposez les plats pour{" "}
              {new Date(selectedDay).toLocaleDateString()}
            </h3>
            <div className="search-bar1">
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="categories">
              {["breakfast", "lunch", "dinner"].map((category) => (
                <div
                  key={category}
                  className="category"
                  onDrop={(event) => handleDrop(event, selectedDay, category)}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <h4>
                    {category === "breakfast"
                      ? "Petit-déjeuner"
                      : category === "lunch"
                      ? "Déjeuner"
                      : "Dîner"}
                  </h4>
                  <div className="tasks">
                    {(tasks[selectedDay]?.[category] || []).map(
                      (task, index) => (
                        <div key={index} className="task">
                          {task}
                          <button
                            className="remove-task"
                            onClick={() =>
                              handleRemoveTask(selectedDay, category, index)
                            }
                          >
                            ✖
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="drag-items scrollable-list">
              {filteredPlats.map((plat) => (
                <div
                  key={plat.id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, plat.Titre)}
                  className="drag-item"
                >
                  <img
                    src={plat.Image}
                    alt={plat.Titre}
                    className="plat-image"
                  />
                  <p className="plat-name">{plat.Titre}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanMonth;
