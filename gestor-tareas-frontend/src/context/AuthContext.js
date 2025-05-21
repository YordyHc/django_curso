// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api"; // usa tu cliente configurado

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );

  const login = async (username, password) => {
    try {
      const res = await API.post("/api/token/", {
        username,
        password,
      });
      setAuthTokens(res.data);
      setUser(jwtDecode(res.data.access));
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      return true; // 👈 Devuelve true si ok
    } catch (err) {
      console.error("Error de login:", err.response?.data || err.message);
      return false; // 👈 Devuelve false si error
    }
  };

  const logout = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const res = await API.post("/api/token/refresh/", {
        refresh: authTokens?.refresh,
      });
      const data = res.data;
      setAuthTokens({ access: data.access, refresh: authTokens.refresh });
      setUser(jwtDecode(data.access));
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: data.access, refresh: authTokens.refresh })
      );
    } catch {
      logout();
    }
  }, [authTokens, logout]);

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(() => refreshToken(), 1000 * 60 * 4);
      return () => clearInterval(interval);
    }
  }, [authTokens, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, authTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
