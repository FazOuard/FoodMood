import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./admin.css"; // Ajoutez vos styles ici
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const ProfilAdmin = () => {
  return (
    
    <div className="wrapperFaz">
     

      <div className="sectionFaz back-greyFaz">
        <div className="container-customFaz">
          
          <div className="sidebar-customFaz">
            <ul className="nav-listFaz">
              <li>
                <Link to="Dashboard" className="nav-link">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="ManageUsers" className="nav-link">
                  <FaRegUser /> Utilisateurs
                </Link>
              </li>
              <li>
                <Link to="PlatsAdmin" className="nav-link">
                  <IoFastFoodOutline /> Plats
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="content-customFaz">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;
