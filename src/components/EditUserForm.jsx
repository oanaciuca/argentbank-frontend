import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authSlice'; 

const EditUserForm = ({ onSave, onCancel, loading }) => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const [newUserData, setNewUserData] = useState({
    userName: userData.userName || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
  });

  useEffect(() => {
    if (userData) { 
    setNewUserData({
      userName: userData.userName || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
    });
  }
  }, [userData]); 

  
  const handleSaveClick = () => {
    dispatch(updateUser({ newUserName: newUserData.userName })); 
    onSave(newUserData); 
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
