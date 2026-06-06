"use client";

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
          <div className="card-icon"><i data-lucide="wallet"></i></div>
          <h3>Total Net Worth</h3>
          <p className="amount">${totalBalance.toFixed(2)}</p>
        </div>

        <div className="card liquid-card">
          <div className="card-icon"><i data-lucide="banknote"></i></div>
          <h3>Available Cash</h3>
          <p className="amount">${totalBalance.toFixed(2)}</p>
        </div>

        <div className="card income-card">
          <div className="card-icon"><i data-lucide="trending-up"></i></div>
          <h3>Total Income</h3>
          <p className="amount">${totalIncome.toFixed(2)}</p>
        </div>

        <div className="card expense-card">
          <div className="card-icon"><i data-lucide="trending-down"></i></div>
          <h3>Total Expenses</h3>
          <p className="amount">${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Placeholder for budget and widgets to match layout */}
      <div className="budget-card">
        <div className="budget-card-header">
          <h3>Monthly Budget Goal</h3>
        </div>
      </div>
      <div className="dashboard-grid-two-col">
        <div className="dashboard-widget-card">
          <div className="widget-card-header">
            <h3>Category Budgets</h3>
          </div>
        </div>
        <div className="dashboard-widget-card">
          <div className="widget-card-header">
            <h3>Savings Goals</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
