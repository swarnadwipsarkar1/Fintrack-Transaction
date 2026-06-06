"use client";
import { useState } from "react";
import { Download, Upload, Pencil, Trash2, Briefcase, ShoppingBag, Utensils, Car, Tv, HeartPulse, Home, Gift, MoreHorizontal } from "lucide-react";

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Salary': return <Briefcase size={20} />;
    case 'Shopping': return <ShoppingBag size={20} />;
    case 'Food': return <Utensils size={20} />;
    case 'Transport': return <Car size={20} />;
    case 'Entertainment': return <Tv size={20} />;
    case 'Health': return <HeartPulse size={20} />;
    case 'Rent': return <Home size={20} />;
    case 'Gift': return <Gift size={20} />;
    default: return <MoreHorizontal size={20} />;
  }
};

export default function Transactions({ transactions, setTransactions }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    category: "Food",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newTx = await res.json();
        setTransactions([...transactions, newTx]);
        setFormData({ ...formData, description: "", amount: "" }); // Reset some fields
      }
    } catch (err) {
      console.error("Error adding transaction", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTransactions(transactions.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Error deleting transaction", err);
    }
  };

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="transactions-section" className="page-section active-section">
      <div className="page-header">
        <h2>Transactions</h2>
        <p>Add and manage your income & expenses</p>
      </div>

      <div className="form-card">
        <h3>Add New Transaction</h3>
        <form id="transaction-form" onSubmit={handleAddTransaction} noValidate>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="e.g. Monthly Salary"
              value={formData.description}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select id="type" value={formData.type} onChange={handleInputChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={formData.date} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" value={formData.category} onChange={handleInputChange}>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group"></div>

          <button type="submit" className="submit-btn" id="add-tx-btn">
            + Add Transaction
          </button>
        </form>
      </div>

      <div className="list-header">
        <h3>Transaction History</h3>
        <div className="list-controls">
          <input
            type="text"
            className="search-input"
            id="search-input"
            placeholder="Search..."
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="export-btn" id="export-csv-btn">
            <Download size={14} style={{ marginRight: 4, display: "inline-block", verticalAlign: "middle" }} /> Export CSV
          </button>
          <button className="import-btn" id="import-csv-btn">
            <Upload size={14} style={{ marginRight: 4, display: "inline-block", verticalAlign: "middle" }} /> Import CSV
          </button>
        </div>
      </div>

      <ul id="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">No transactions found.</div>
        ) : (
          filteredTransactions.map((tx) => (
            <li key={tx.id} className={tx.type === "income" ? "income-item" : "expense-item"}>
              <div className="tx-icon">
                 {getCategoryIcon(tx.category)}
              </div>
              <div className="tx-info">
                <div className="tx-desc">{tx.description}</div>
                <div className="tx-meta">{tx.date}</div>
              </div>
              <span className="tx-badge">{tx.category}</span>
              <span className="tx-amount">
                 {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
              </span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button className="edit-btn" aria-label="Edit transaction">
                  <Pencil size={14} />
                </button>
                <button className="delete-btn" aria-label="Delete transaction" onClick={() => handleDelete(tx.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
