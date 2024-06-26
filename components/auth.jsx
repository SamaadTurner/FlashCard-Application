import { useAuth0 } from '@auth0/auth0-react';

// Creating a hook to use Auth0 and fetch the access token
export const useAuth = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function to get the access token
  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  return {
    getAccessToken,
  };
};