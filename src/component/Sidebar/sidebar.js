import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./sidebar_styles.css";
import React, { useState } from "react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsOpen(false); 
  };

  return (
    <>
    
      <button className="hamburger btn btn-dark" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`menu border-end p-3 ${isOpen ? "open" : ""}`}>
        <div className="nav flex-column mt-4">
          <div className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              onClick={() => handleTabClick("dashboard")}
              style={{
                background: activeTab === "dashboard" ? "#dc3545" : "transparent",
                color: activeTab === "dashboard" ? "white" : "black",
              }}
            >
              Dashboard
            </Link>
          </div>
          <div className="nav-item">
            <Link
              className="nav-link"
              to="/profile"
              onClick={() => handleTabClick("profile")}
              style={{
                background: activeTab === "profile" ? "#dc3545" : "transparent",
                color: activeTab === "profile" ? "white" : "black",
              }}
            >
              Profile
            </Link>
          </div>
           <div className="nav-item">
            <Link
              className="nav-link"
              to="/addmovies"
              onClick={() => handleTabClick("addmovies")}
              style={{
                background:
                  activeTab === "addmovies" ? "#dc3545" : "transparent",
                color: activeTab === "addmovies" ? "white" : "black",
              }}
            >
              Add Movie
            </Link>
            </div>
          <div className="nav-item">
            <Link
              className="nav-link"
              to="/changepassword"
              onClick={() => handleTabClick("changepassword")}
              style={{
                background:
                  activeTab === "changepassword" ? "#dc3545" : "transparent",
                color: activeTab === "changepassword" ? "white" : "black",
              }}
            >
              Change Password
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
