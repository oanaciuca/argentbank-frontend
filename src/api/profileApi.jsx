export const fetchProfileDetails = async (token) => {
  // Vérifie si le token est fourni avant de faire la requête
  if (!token) {
    throw new Error('Token manquant');
  }

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Utilisation correcte du token
      },
    });

    // Vérifie la réponse de l'API
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur lors de la récupération du profil:', errorText);
      throw new Error(`Erreur serveur: ${errorText}`);
    }

    const data = await response.json();
    console.log('Détails du profil récupérés:', data);  // Ajout du log pour vérifier la réponse

    // Vérifie la structure de la réponse
    if (!data.status || !data.message || !data.body) {
      throw new Error('Réponse du serveur invalide : structure de données incorrecte.');
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;  // Lancer l'erreur pour la propager
  }
};