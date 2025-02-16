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

  if (!data.body || !data.body.token) {
    throw new Error('Token manquant dans la réponse');
  }

  const token = data.body.token;
  localStorage.setItem('token', `Bearer ${token}`);
  
  return { token };
};

export const logout = () => {
  localStorage.removeItem('token');
};
