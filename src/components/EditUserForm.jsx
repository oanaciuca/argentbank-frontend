import React, { useState, useEffect } from 'react';

const EditUserForm = ({ userData, onSave, onCancel, loading }) => {
  const [newUserData, setNewUserData] = useState({
    userName: userData.userName || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
  });

  useEffect(() => {
    if (userData) { 
      console.log("EditUserForm - useEffect - userData:", userData);
      setNewUserData({
        userName: userData.userName || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
      });
    }
  }, [userData]); 

  const handleSaveClick = () => {
    console.log("EditUserForm - newUserData avant envoi :", newUserData);
    console.log('EditUserForm - Type de newUserData.userName :', typeof newUserData.userName);
    
    if (typeof newUserData.userName === 'string' && newUserData.userName.trim() !== '') {
      console.log("EditUserForm - newUserData.userName :", newUserData.userName);

      onSave({ userName: newUserData.userName });
    } else {
      console.error("EditUserForm - Le nom d'utilisateur doit être une chaîne de caractères non vide.");
    }
  };

  return (
    <div className="edit-container">
      <h1>Edit user info</h1>
      <form className="edit-user-form">
        <div className="form-group">
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            value={newUserData.userName}
            onChange={(e) => setNewUserData({ ...newUserData, userName: e.target.value })} 
            placeholder="Enter a new username"
          />
          <p>Valeur du username : {newUserData.userName}</p>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            value={newUserData.firstName}
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            value={newUserData.lastName}
            readOnly 
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleSaveClick} className="edit-form-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancel} className="edit-form-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
