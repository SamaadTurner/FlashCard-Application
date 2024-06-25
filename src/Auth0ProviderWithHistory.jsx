import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // Import Router and useNavigate

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  
  const navigate = useNavigate(); 
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
   
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          scope: "openid profile email"
        }}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>

  );
};

export default Auth0ProviderWithHistory;
