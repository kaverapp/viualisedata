import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dashboard } from "../pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AuthButtons = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    isLoading,
    error,
    user,
  } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
          <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </>
  );
};
