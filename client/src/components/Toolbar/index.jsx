import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import "bootstrap/dist/css/bootstrap.min.css";
import "./Toolbar.css"; // Custom CSS file

const Toolbar = () => {
  return (
    <nav className="toolbar px-5 ms-4 ">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          BeautyHub
        </Link>
        <div className="d-flex">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
