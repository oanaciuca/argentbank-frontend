export const fetchProfileDetails = async (token) => {
  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = `Failed to fetch profile details: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};
