import React from 'react';

export default function AccountRoom({ accounts, onCreateAccount, onMakeTransaction, onLogout }) {
  return (
    <div className="account-room card">
      <h2>Your Accounts</h2>
      <div className="account-menu">
        <button className="menu-btn" onClick={onCreateAccount}>➕ Create New Account</button>
        <button className="menu-btn" onClick={onMakeTransaction}>� Make a transaction</button>
        <button className="menu-btn" onClick={onLogout}>🚪 Logout</button>
      </div>
      <ul className="accounts-list">
        {accounts.map(acc => (
          <li key={acc.accNum} className="account-item">
            <div className="account-info-block">
              <span className="account-label">Account #{acc.accNum}</span>
              <span className="account-balance">Balance: <b>${acc.balance}</b></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
