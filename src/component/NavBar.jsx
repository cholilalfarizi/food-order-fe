import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setBackend }) => {
  const navigate = useNavigate();
  const [activeBackend, setActiveBackend] = useState("express"); // Default to Express

  const handleBackendChange = (backend) => {
    setActiveBackend(backend);
    setBackend(backend); // Update backend globally
  };

  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu is-centered">
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => navigate("/customer")}>
            Customer
          </a>

          <a className="navbar-item" onClick={() => navigate("/food")}>
            Food
          </a>

          <a className="navbar-item" onClick={() => navigate("/transaction")}>
            Transaction
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                className={`button ${
                  activeBackend === "express"
                    ? "is-primary is-active"
                    : "is-light"
                }`}
                onClick={() => handleBackendChange("express")}
              >
                <strong>Express</strong>
              </a>
              <a
                className={`button ${
                  activeBackend === "nest" ? "is-primary is-active" : "is-light"
                }`}
                onClick={() => handleBackendChange("nest")}
              >
                Nest
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
