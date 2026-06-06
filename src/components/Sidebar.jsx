"use client";
import { PieChart, List, Target, LogOut, Sun, Moon } from "lucide-react";

export default function Sidebar({ activeView, setActiveView, toggleTheme, isLightMode }) {
  return (
    <aside>
      <div className="sidebar-logo">
        <div className="logo-icon">
          <PieChart size={22} color="white" />
        </div>
        <h1>FinTrack</h1>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-label">Main Menu</li>
          <li>
            <button
              className={`nav-btn ${activeView === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveView("dashboard")}
            >
              <PieChart size={18} /> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activeView === "transactions" ? "active" : ""}`}
              onClick={() => setActiveView("transactions")}
            >
              <List size={18} /> Transactions
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activeView === "savings" ? "active" : ""}`}
              onClick={() => setActiveView("savings")}
            >
              <Target size={18} /> Savings Goals
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isLightMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isLightMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
