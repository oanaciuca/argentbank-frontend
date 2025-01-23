import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authSlice'; // Importer la fonction updateUser du userSlice

const EditUserForm = ({ onSave, onCancel, loading }) => {
  // Récupérer l'utilisateur connecté depuis le store Redux
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // Si userData est indéfini ou vide, on peut retourner un état de chargement.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si userData est encore indéfini ou vide, on peut afficher un message d'erreur ou ne rien afficher
  if (!userData) {
    return <div>No user data available</div>;
  }

  // Utilisation de useState avec userData pour initialiser les valeurs par défaut
  const [newUserData, setNewUserData] = useState({
    userName: userData.userName || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
  });

  // Ajouter le useEffect pour mettre à jour les données lorsque userData change
  useEffect(() => {
    if (userData) { 
    setNewUserData({
      userName: userData.userName || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
    });
  }
  }, [userData]); // Ce hook sera exécuté chaque fois que userData change

  // Mise à jour des champs lorsque l'utilisateur modifie les valeurs
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Changement de ${id}: ${value}`); // Ajoutez un log pour voir la valeur
    setNewUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Sauvegarde des modifications
  const handleSaveClick = () => {
    console.log('Données sauvegardées:', newUserData);
    dispatch(updateUser({ newUserName: newUserData.userName })); // Mettre à jour les informations utilisateur dans le store
    onSave(newUserData); // Appeler onSave avec les nouvelles données
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
            onChange={(e) => setNewUserData({ ...newUserData, userName: e.target.value })} // Mettre à jour uniquement userName ici
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
            readOnly // Le champ est en lecture seule
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            value={newUserData.lastName}
            readOnly // Le champ est en lecture seule
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
