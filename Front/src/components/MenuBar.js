// src/components/MenuBar.js
import React, { useState } from "react";
import "../MenuBar.css";

const MenuBar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu-bar">
      <img src="./logo_app.png" alt="Logo" className="logo" />
      <div className="dropdown">
        <button className="dropbtn">{language}</button>
        <div className="dropdown-content">
          <a onClick={() => setLanguage("ENG")}>ENG</a>
          <a onClick={() => setLanguage("ESP")}>ESP</a>
        </div>
      </div>
      <button>Register</button>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
    </div>
  );
};

export default MenuBar;
