export const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  

  export const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };