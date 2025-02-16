export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token absent');
  }

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur serveur: ${errorText}`);
    }

    const data = await response.json();
    return data.user ? data.user : data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil utilisateur:", error);
    throw error;
  }
  
};
