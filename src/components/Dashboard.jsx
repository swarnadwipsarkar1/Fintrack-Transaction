"use client";

export default function Dashboard({ transactions }) {
  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <section id="dashboard-view" className="view-section active">
      <div className="summary-grid">
        <div className="card balance-card">
          <h3>Total Balance</h3>
          <p className="amount" id="total-balance">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="amount" id="total-income">+${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p className="amount" id="total-expenses">-${totalExpense.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}
