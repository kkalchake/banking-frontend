import React, { useState } from 'react';

export default function Transaction({ accounts, onDeposit, onWithdraw, onTransfer, onBack, message, loading }) {
  const [fromAcc, setFromAcc] = useState(accounts.length ? accounts[0].accNum : '');
  const [toAcc, setToAcc] = useState('');
  const [amount, setAmount] = useState('');

  const fromBalance = accounts.find(acc => acc.accNum === fromAcc)?.balance || '0';

  return (
    <div className="transaction-page card">
      <h2>Centralized Transactions</h2>
      <div className="transaction-menu">
        <div className="transaction-group">
          <label htmlFor="fromAcc">From Account:</label>
          <select id="fromAcc" value={fromAcc} onChange={e => setFromAcc(e.target.value)}>
            {accounts.map(acc => (
              <option key={acc.accNum} value={acc.accNum}>
                {acc.accNum} (Balance: ${acc.balance})
              </option>
            ))}
          </select>
        </div>
        <div className="transaction-group">
          <label htmlFor="amount">Amount:</label>
          <input id="amount" placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="transaction-group">
          <button className="menu-btn" onClick={() => onDeposit(fromAcc, amount)}>💵 Deposit</button>
          <button className="menu-btn" onClick={() => onWithdraw(fromAcc, amount, fromBalance)}>💸 Withdraw</button>
        </div>
        <div className="transaction-group">
          <label htmlFor="toAcc">To Account:</label>
          <select id="toAcc" value={toAcc} onChange={e => setToAcc(e.target.value)}>
            <option value="">Select Account</option>
            {accounts.map(acc => (
              <option key={acc.accNum} value={acc.accNum}>
                {acc.accNum}
              </option>
            ))}
          </select>
          <button className="menu-btn" onClick={() => onTransfer(fromAcc, toAcc, amount)} disabled={!toAcc}>🔁 Transfer</button>
        </div>
        <button className="menu-btn back-btn" onClick={onBack}>⬅️ Back to Accounts</button>
        {message && <div className="feedback info">{message}</div>}
        {loading && <div className="loader">Processing...</div>}
      </div>
    </div>
  );
}
