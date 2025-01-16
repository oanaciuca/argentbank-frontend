export const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return Promise.reject('Échec de la connexion');
  }

  return await response.json(); 
};

export const logout = () => {
  localStorage.removeItem('token');
};
