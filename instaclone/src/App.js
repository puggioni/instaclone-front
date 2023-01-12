
import React, { useState, useEffect, useMemo } from "react";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/auth/";
import {getToken} from "./utils/token";
import {AuthContext} from "./context/AuthContext";
import Home from "./pages/home";
export default function App() {
  const [auth, setAuth] = useState(undefined);
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(token);
    }
  }, []);

  const logOut = () => {
    setAuth(null);
  }
  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
      auth,
      logOut,
      setUser
    }), [auth]
  )
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
      {!auth ? <Auth /> : <Home />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

