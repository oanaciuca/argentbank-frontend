import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchUserProfile } from '../api/userApi';

const User = () => {
  const [userData, setUserData] = useState(null); 
  const [accounts, setAccounts] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetchUserProfile(token)
        .then(data => {
          setUserData(data.body); 
          setAccounts(data.body.accounts || []); 
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch user profile');
          setLoading(false);
        });
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./user.html">
            <i className="fa fa-user-circle"></i>
            {userData?.firstName} {userData?.lastName}
          </a>
          <a className="main-nav-item" href="./index.html">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userData?.firstName} {userData?.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.length > 0 ? (
          accounts.map((account, index) => (
            <section className="account" key={index}>
              <div className="account-content-wrapper">
                <h3 className="account-title">{account.name} ({account.id})</h3>
                <p className="account-amount">${account.balance}</p>
                <p className="account-amount-description">{account.description}</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
          ))
        ) : (
          <p>No accounts found.</p> 
        )}
        
      </main>
      <Footer />
    </div>
  );
};

export default User;
