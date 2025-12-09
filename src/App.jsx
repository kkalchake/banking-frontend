


import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import AccountRoom from './pages/AccountRoom';
import Transaction from './pages/Transaction';

const API = 'http://localhost:8080/api';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAcc, setSelectedAcc] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper for feedback
  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Login/Register
  const handleLogin = async (username, password) => {
    setLoading(true);
    const res = await fetch(`${API}/login?username=${username}&password=${password}`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      setUser({ username, password });
      await fetchAccounts(username);
      setPage('accounts');
      showMessage('Login successful.', 'success');
    } else {
      setUser(null);
      setAccounts([]);
      showMessage('User does not exist. Please register.', 'error');
    }
  };

  const handleRegister = async (username, password) => {
    setLoading(true);
    const res = await fetch(`${API}/register?username=${username}&password=${password}`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      setUser({ username, password });
      await fetchAccounts(username);
      setPage('accounts');
      showMessage('Registered and logged in!', 'success');
    } else {
      setUser(null);
      setAccounts([]);
      showMessage('Registration failed. Try a different username.', 'error');
    }
  };

  // Fetch all accounts for user
  const fetchAccounts = async (username) => {
    const res = await fetch(`${API}/account?username=${username}`, { method: 'POST' });
    const accNum = res.ok ? await res.text() : null;
    if (accNum && !accNum.toLowerCase().includes('no such')) {
      const balRes = await fetch(`${API}/balance?accNum=${accNum}`);
      const balance = balRes.ok ? await balRes.text() : '0';
      if (balance && !balance.toLowerCase().includes('no such')) {
        setAccounts([{ accNum, balance }]);
      } else {
        setAccounts([]);
      }
    } else {
      setAccounts([]);
    }
  };

  // Create new account
  const handleCreateAccount = async () => {
    if (!user) return;
    setLoading(true);
    const res = await fetch(`${API}/account?username=${user.username}`, { method: 'POST' });
    setLoading(false);
    const accNum = res.ok ? await res.text() : null;
    if (accNum && !accNum.toLowerCase().includes('no such')) {
      showMessage('Account created!', 'success');
      await fetchAccounts(user.username);
    } else {
      showMessage('Account creation failed.', 'error');
    }
  };

  // Select account for transaction
  const handleSelectAccount = (accNum) => {
    setSelectedAcc(accNum);
    setPage('transaction');
  };

  // Deposit
  const handleDeposit = async (accNum, amount) => {
    setLoading(true);
    const res = await fetch(`${API}/deposit?accNum=${accNum}&amount=${amount}`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      showMessage('Deposit successful!', 'success');
      updateAccountBalance(accNum);
    } else {
      showMessage('Deposit failed.', 'error');
    }
  };

  // Withdraw
  const handleWithdraw = async (accNum, amount, balance) => {
    if (parseFloat(amount) > parseFloat(balance)) {
      showMessage('Withdraw amount exceeds current balance.', 'error');
      return;
    }
    setLoading(true);
    const res = await fetch(`${API}/withdraw?accNum=${accNum}&amount=${amount}`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      showMessage('Withdraw successful!', 'success');
      updateAccountBalance(accNum);
    } else {
      showMessage('Withdraw failed.', 'error');
    }
  };

  // Transfer
  const handleTransfer = async (fromAcc, toAcc, amount) => {
    setLoading(true);
    const res = await fetch(`${API}/transfer?from=${fromAcc}&to=${toAcc}&amount=${amount}`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      showMessage('Transfer successful!', 'success');
      updateAccountBalance(fromAcc);
    } else {
      showMessage('Transfer failed.', 'error');
    }
  };

  // Update balance for account
  const updateAccountBalance = async (accNum) => {
    const balRes = await fetch(`${API}/balance?accNum=${accNum}`);
    const balance = balRes.ok ? await balRes.text() : '0';
    setAccounts(accs => accs.map(acc => acc.accNum === accNum ? { ...acc, balance } : acc));
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setAccounts([]);
    setSelectedAcc(null);
    setPage('login');
  };

  // Back to accounts
  const handleBack = () => {
    setSelectedAcc(null);
    setPage('accounts');
  };

  // Render pages
  return (
    <div className="banking-app">
      <h1>🏦 Banking Companion</h1>
      {page === 'login' && (
        <Login
          onLogin={handleLogin}
          onRegister={handleRegister}
          message={message}
          loading={loading}
        />
      )}
      {page === 'accounts' && (
        <div className="account-room card">
          <h2>Welcome, {user?.username}</h2>
          <div className="account-menu">
            <button className="menu-btn" onClick={handleCreateAccount}>➕ Create Account</button>
            <button className="menu-btn" onClick={() => setPage('transaction')} disabled={accounts.length === 0}>💳 Make a transaction</button>
            <button className="menu-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
          {accounts.length > 0 && <h3>Your Accounts</h3>}
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
      )}

      {/* Removed create-account page, account creation is now inline in the menu */}
      {page === 'transaction' && (
        <Transaction
          accounts={accounts}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onTransfer={handleTransfer}
          onBack={handleBack}
          message={message}
          loading={loading}
        />
      )}
  {page === 'login' && message && <div className="feedback info">{message}</div>}
    </div>
  );
}

export default App;
