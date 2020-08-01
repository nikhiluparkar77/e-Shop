import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const openNav = () => {
    document.getElementById("mySidenav").style.display = "block";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.display = "none";
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            E-Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-list-2"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-list-2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="HangBurger" onClick={openNav}>
                  &#9776;
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="mySidenav" className="sidenav">
        <a className="closebtn" href="#" onClick={closeNav}>
          &times;
        </a>
        <Link to="/">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Products</Link>
        <Link to="#">Clients</Link>
        <Link to="#">Contact</Link>
      </div>
    </div>
  );
};

export default Header;
