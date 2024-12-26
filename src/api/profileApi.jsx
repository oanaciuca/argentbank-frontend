export const fetchProfileDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile details');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profile details:', error);
      throw error;
    }
  };