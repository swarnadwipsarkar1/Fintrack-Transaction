"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Transactions from "../components/Transactions";
import Analytics from "../components/Analytics";
import Savings from "../components/Savings";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        toggleTheme={toggleTheme} 
        isLightMode={isLightMode} 
      />
      <main className="main-content">

        {/* View Switcher */}
        {activeView === "dashboard" && <Dashboard transactions={transactions} />}
        {activeView === "transactions" && <Transactions transactions={transactions} setTransactions={setTransactions} />}
        {activeView === "analytics" && <Analytics transactions={transactions} />}
        {activeView === "savings" && <Savings />}
      </main>
      
      {!isAuthenticated && <AuthModal onLogin={() => setIsAuthenticated(true)} />}
    </>
  );
}
