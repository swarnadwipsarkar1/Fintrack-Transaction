"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Transactions from "../components/Transactions";
import Analytics from "../components/Analytics";
import Savings from "../components/Savings";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isLightMode, setIsLightMode] = useState(false);

  // Example state for UI
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load theme preference
    const storedTheme = localStorage.getItem("fintrack-theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
      document.body.classList.add("light-theme");
    }
    
    // Fetch initial data from Express API
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-theme");
    localStorage.setItem("fintrack-theme", !isLightMode ? "light" : "dark");
  };

  return (
    <div className="layout-wrapper">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        toggleTheme={toggleTheme} 
        isLightMode={isLightMode} 
      />
      <main className="main-content">
        <header className="top-header">
          <div className="header-greeting">
            <h2>Welcome back, <span>User</span>!</h2>
            <p className="subtitle">Here's your financial overview.</p>
          </div>
          <div className="mobile-menu-btn" id="mobile-menu-btn">
             <i data-lucide="menu"></i>
          </div>
        </header>
        
        {/* View Switcher */}
        {activeView === "dashboard" && <Dashboard transactions={transactions} />}
        {activeView === "transactions" && <Transactions transactions={transactions} setTransactions={setTransactions} />}
        {activeView === "analytics" && <Analytics transactions={transactions} />}
        {activeView === "savings" && <Savings />}
      </main>
    </div>
  );
}
