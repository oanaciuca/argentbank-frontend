export const updateUserProfile = async (newUsername) => {
    const token = localStorage.getItem('token');  
    
    console.log("Token récupéré depuis localStorage : ", token); 

    if (!token) {
      throw new Error("Token absent");
    }

    if (!token.startsWith('Bearer ') || token.split(' ').length !== 2) {
      throw new Error("Token malformé. Attendu: Bearer <JWT>");
    }
    
    if (typeof newUsername !== 'string') {
      throw new Error("Le nom d'utilisateur doit être une chaîne de caractères");
    }

    console.log("newUsername dans updateUserProfile :", newUsername);

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,  
        },
        body: JSON.stringify({ userName: newUsername }),  
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur: ${errorText}`);
      }

      const data = await response.json();
      console.log("Réponse de l'API après mise à jour:", JSON.stringify(data, null, 2)); 
      return data;  
    } catch (error) {
      console.error('Erreur lors de la requête PUT:', error);
      throw error;  
    }
};
