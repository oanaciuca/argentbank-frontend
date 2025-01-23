import usersData from '../data/usersData'; // Assure-toi que le chemin est correct

export const login = async (email, password) => {
  // Requête vers le backend pour valider les identifiants
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // Vérification de la réponse
  if (!response.ok) {
    return Promise.reject('Échec de la connexion');
  }

  // Récupération des données de la réponse
  const data = await response.json();
  console.log('login response:', data); // Log pour inspecter la réponse du serveur

  // Recherche des informations utilisateur dans `usersData`
  const user = usersData.find((u) => u.email === email);
  if (!user) {
    throw new Error('Utilisateur introuvable');
  }

  // Combine les données du serveur avec celles du tableau local
  return {
    token: data.token, // Garde le token renvoyé par le serveur
    userData: {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    },
    email, // Inclut l'email dans la réponse
  };
};

export const logout = () => {
  localStorage.removeItem('token');
};
