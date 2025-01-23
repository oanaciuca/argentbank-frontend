import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import { updateUser } from '../redux/authSlice';

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, userData, token } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (newUserData) => {
    dispatch(updateUser({ newUserName: newUserData, token })); // Dispatcher l'action de mise à jour
    setIsEditing(false);
  };

  if (!isAuthenticated || !userData) {
    return <div>Loading...</div>;
  }

  
  

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditUserForm
            userData={userData}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={false} // Si un état de chargement est nécessaire
          />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {userData.firstName} {userData.lastName}!
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {[
        {
          title: 'Argent Bank Checking (x8349)',
          amount: '$2,082.79',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Savings (x6712)',
          amount: '$10,928.42',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Credit Card (x8349)',
          amount: '$184.30',
          description: 'Current Balance',
        },
      ].map((account, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default User;
