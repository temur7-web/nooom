import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <h2>Create a new post</h2>

      {/* CREATE BUTTONS */}
      <div className="create-buttons">
        <NavLink to="/contact" className="box">
          Post
        </NavLink>

        <div className="box">Album</div>
        <div className="box">Audio</div>
        <div className="box">Poll</div>
      </div>

      {/* TABS */}
      <div className="tabs">
        {/* PUBLISHED (INDEX ROUTE) */}
        <NavLink style={{ color: 'black' }}

          to="."
          end
          className={({ isActive }) =>isActive ? "tab active" : "tab" } >Published </NavLink>

        <NavLink style={{ color: 'black' }}
          to="draf"
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
        >
          Drafted
        </NavLink>

        <NavLink style={{ color: 'black' }}
          to="schet"
          className={({ isActive }) =>
            isActive ? "tab active" : "tab"
          }
        >
          Scheduled
        </NavLink>
      </div>

      {/* TAB CONTENT */}
      <div className="about-content">
        <Outlet />
      </div>
    </div>
  );
}

export default About;
 