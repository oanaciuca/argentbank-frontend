export const updateUserProfile = async (newUsername, token) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ userName: newUsername }), 
  });

  if (!response.ok) {
    return Promise.reject('Impossible de mettre à jour le nom d\'utilisateur');
  }

  return await response.json(); 
};
