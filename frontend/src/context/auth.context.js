import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../api/api";

// Create a new context called AuthContext
export const AuthContext = createContext();

// Define a component called AuthContextProvider that takes in children as props
export const AuthContextProvider = ({ children }) => {
  // Initialize a state variable
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${BASE_URL}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
