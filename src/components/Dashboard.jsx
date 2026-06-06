"use client";
import { Wallet, Banknote, TrendingUp, TrendingDown, Target, PieChart, Settings } from "lucide-react";

export default function Dashboard({ transactions }) {
  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <section id="dashboard-section" className="page-section active-section">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Your financial overview at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="widget-container">
        <div className="card balance-card">
          <div className="card-icon"><Wallet size={24} /></div>
          <h3>Total Net Worth</h3>
          <p className="amount">${totalBalance.toFixed(2)}</p>
        </div>

        <div className="card liquid-card">
          <div className="card-icon"><Banknote size={24} /></div>
          <h3>Available Cash</h3>
          <p className="amount">${totalBalance.toFixed(2)}</p>
        </div>

        <div className="card income-card">
          <div className="card-icon"><TrendingUp size={24} /></div>
          <h3>Total Income</h3>
          <p className="amount">${totalIncome.toFixed(2)}</p>
        </div>

        <div className="card expense-card">
          <div className="card-icon"><TrendingDown size={24} /></div>
          <h3>Total Expenses</h3>
          <p className="amount">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Budget Goal Widget */}
      <div className="budget-card">
        <div className="budget-card-header">
          <span><Target size={20} /></span>
          <h3>Monthly Budget Goal</h3>
        </div>
        <div className="budget-input-row">
          <input
            type="number"
            placeholder="Set monthly spending limit (e.g. 2000)"
            min="1"
            style={{ flex: 1, padding: "10px 14px", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)" }}
          />
          <button className="submit-btn" style={{ padding: "10px 20px" }}>Set Goal</button>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: "0%" }}></div>
        </div>
        <div className="progress-label" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 8, color: "var(--text-secondary)" }}>
          <span>$0.00 spent</span>
          <span>Goal: Not set</span>
        </div>
      </div>

      <div className="dashboard-grid-two-col">
        <div className="dashboard-widget-card">
          <div className="widget-card-header">
            <span><PieChart size={20} /></span>
            <h3>Category Budgets</h3>
            <button className="widget-action-btn" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Settings size={14} /> Manage
            </button>
          </div>
          <div className="widget-list">
             <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>No category budgets configured. Click manage to set limits!</p>
          </div>
        </div>
        <div className="dashboard-widget-card">
          <div className="widget-card-header">
            <span><Target size={20} /></span>
            <h3>Savings Goals</h3>
            <button className="widget-action-btn">+ Add Goal</button>
          </div>
          <div className="widget-list">
             <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>No savings goals set. Time to dream big!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
