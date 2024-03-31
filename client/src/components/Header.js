import React from "react";
import "./Header.css"; // Make sure to create this CSS file in the same directory
import logo from "./fplogo.png";

function Header() {
  return (
    <nav className="header-navbar">
      <div className="nav-button-group1">
        <button className="nav-button"></button>
        <button className="nav-button"></button>
      </div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <div className="nav-button-group2">
        <button className="nav-button"></button>
        <button className="nav-button"></button>
      </div>
    </nav>
  );
}

export default Header;
