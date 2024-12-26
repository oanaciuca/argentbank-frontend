export const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
  
      return data; 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error; 
    }
  };

  export const updateUserProfile = async (token, profileData) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  