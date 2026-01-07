import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CgCalendarTwo } from "react-icons/cg";

import "./Header.css";

function Header() {
  return (
    <div className="sidebar">
      <NavLink to="/" className="logo">
        <img src="coffe.jpg" alt="logo" />
      </NavLink>

      <nav className="menu">
        <NavLink to="/" className="menu-item">
          <AiFillHome/>
          <span className="routs">Home</span>
        </NavLink>

        <NavLink to="/about" className="menu-item">
          <CgCalendarTwo />
          <span className="routs">Post</span>
        </NavLink>

       
      </nav>
    </div>
  );
}

export default Header;
