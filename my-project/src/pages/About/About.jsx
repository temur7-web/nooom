import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <h2>Create a new post</h2>

      <div className="create-buttons">
        <NavLink to="/contact" className="box"><div className="box">Post</div></NavLink>

        <div className="box">Album</div>
        <div className="box">Audio</div>
        <div className="box">Poll</div>
      </div>

      <div className="tabs">
        <NavLink
          to="pub"
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
        >
          <p className="p">Published</p>
        </NavLink>

        <NavLink
          to="draf"
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
        >
          <p className="p">Drafted</p>
        </NavLink>

        <NavLink
          to="schet"
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
        >
          <p className="p"> Scheduled</p>
        </NavLink>
      </div>

      <div className="about-content">
        <Outlet />
      </div>
    </div>
  );
}

export default About;
