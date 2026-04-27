import React, { createContext, useContext, useEffect, useState } from "react";

import {
  loginRequest,
  signupRequest,
  getStoredAuth,
  clearStoredAuth,
  storeAuth,
  updateProfileRequest,
} from "../auth/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user: loggedInUser, token: newToken } = await loginRequest(email, password);
    setUser(loggedInUser);
    setToken(newToken);
    storeAuth(loggedInUser, newToken);
  };

  const signup = async (name, email, password) => {
    const { user: createdUser, token: newToken } = await signupRequest(name, email, password);
    setUser(createdUser);
    setToken(newToken);
    storeAuth(createdUser, newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearStoredAuth();
  };

  const updateProfile = async (profileData) => {
    if (!token) throw new Error("You must be logged in");
    const { user: updatedUser, token: newToken } = await updateProfileRequest({
      token,
      ...profileData,
    });
    setUser(updatedUser);
    setToken(newToken);
    storeAuth(updatedUser, newToken);
    return updatedUser;
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    updateProfile,
    logout,
    isAuthenticated: Boolean(user && token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

