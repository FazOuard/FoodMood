import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./admin.css"; // Ajoutez vos styles ici
import { MdDashboard, MdOutlineLogin } from "react-icons/md";
import { FaCheck, FaRegUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiBowlFoodFill } from "react-icons/pi";
import NavBar from "../../components/navbar/navbar";

const ProfilAdmin = () => {
  return (
    
    <div className="wrapperFaz">
     <NavBar/>

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
              <li>
                <Link to="Ingredient" className="nav-link">
                  <PiBowlFoodFill /> Ingredients
                </Link>
              </li>
              <li>
                <Link to="Confirmer" className="nav-link">
                  <FaCheck />  Confirmer
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link">
                <MdOutlineLogin />  Se deconnecter
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
