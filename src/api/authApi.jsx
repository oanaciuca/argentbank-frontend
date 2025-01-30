import usersData from '../data/usersData';

export const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return Promise.reject('Échec de la connexion');
  }

  const data = await response.json();
  console.log('login response:', data);

  const user = usersData.find((u) => u.email === email);
  if (!user) {
    throw new Error('Utilisateur introuvable');
  }

  if (!data.body || !data.body.token) {
    throw new Error('Token manquant dans la réponse');
  }

  const token = data.body.token;
  localStorage.setItem('token', `Bearer ${token}`);
  console.log("Token stocké dans localStorage:", localStorage.getItem('token'));

  return {
    token,
    userData: {
      id: user.id, 
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
    },
    email,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
};
