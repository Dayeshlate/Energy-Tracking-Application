/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // null = not logged in

  // ✅ Login mock
  const login = async (email, password) => {
    // try {
    //   // Fake backend call with axios (replace with real)
    //   const res = { data: { id: "u1", username: "lokesh", email } };

    //   setUser(res.data);
    //   navigate("/reports"); // after login → reports form
    // } catch (err) {
    //   console.error("Login failed", err);
    // }
    navigate("/reports");
  };

  // ✅ Signup mock
  const signup = async (username, email, password) => {
    // try {
    //   // Fake backend call with axios (replace with real)
    //   const res = { data: { id: "u2", username, email } };

    //   setUser(res.data);
    //   navigate("/reports"); // after signup → reports form
    // } catch (err) {
    //   console.error("Signup failed", err);
    // }
    navigate("/reports");
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = {
    axios,
    navigate,
    user,
    setUser,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
