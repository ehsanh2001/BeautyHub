import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BusinessTypeNav.css"; // Import the CSS file

const BusinessTypeNav = () => {
  const location = useLocation();
  const types = ["Barbershop", "Hair Salon", "Nail Salon", "Spa"];
  return (
    <nav className="services-navbar">
      <ul className="nav-list">
        {types.map((type) => {
          const servicePath = `/`;
          const isActive = location.pathname === servicePath;

          return (
            <li className="nav-item" key={type}>
              <Link
                className={`nav-link ${isActive ? "active" : ""} text-light`}
                to={servicePath}
                state={{ type: type }}
              >
                {type}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BusinessTypeNav;
