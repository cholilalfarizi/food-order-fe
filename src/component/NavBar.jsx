import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
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
      </div>
    </nav>
  );
};

export default NavBar;
