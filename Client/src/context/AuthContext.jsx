




import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user safely from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      // Check if it's a valid non-empty JSON string
      if (
        storedUser &&
        storedUser !== "undefined" &&
        storedUser !== "null" &&
        storedUser.trim() !== ""
      ) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // ✅ Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
