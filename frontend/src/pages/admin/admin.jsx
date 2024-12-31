import React from 'react';
import { Outlet, Link, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './admin.css';
import Dashboard from './dashboard.jsx';
import ManageUsers from './ManageUsers.jsx';
import ManagePlaces from './ManagePlaces.jsx';
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const ProfilAdmin = () => {
  return (
    <div className="wrapper">
      <div className="section back-grey">
        <div className="container">
        <Container fluid className="account-management">
          <Row className="w-100">
            {/* Sidebar */}
            <Col md={3} className="sidebar">
              <Nav defaultActiveKey="Dashboard" className="flex-column">
                <Nav.Link as={Link} to="Dashboard" className="nav-link"><MdDashboard />  Dashboard</Nav.Link>
                <Nav.Link as={Link} to="ManageUsers" className="nav-link"><FaRegUser/>  Utilisateurs</Nav.Link>
                <Nav.Link as={Link} to="ManagePlaces" className="nav-link"><IoFastFoodOutline />  Plats</Nav.Link>
              </Nav>
            </Col>

            {/* Main content */}
            <Col md={9} className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="ManageUsers" element={<ManageUsers />} />
                <Route path="ManagePlaces" element={<ManagePlaces />} />
              </Routes>
              <Outlet />
            </Col>
          </Row>
        </Container>

        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;