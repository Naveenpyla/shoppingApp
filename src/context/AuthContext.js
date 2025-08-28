// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage on start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const expiry = localStorage.getItem("expiry");

    if (storedUser && expiry && new Date().getTime() < expiry) {
      setUser(storedUser);

      // Auto-logout timer
      const remainingTime = expiry - new Date().getTime();
      const timer = setTimeout(() => {
        logout();
      }, remainingTime);

      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("expiry");
    }
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem("expiry", expiryTime);

    // Auto logout in 1 hour
    setTimeout(() => {
      logout();
    }, 60 * 60 * 1000);
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
