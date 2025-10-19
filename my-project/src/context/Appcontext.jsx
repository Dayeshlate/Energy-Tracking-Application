/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { users, reports as dummyReports } from "../data/dummydata";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState(dummyReports);
  const [loading, setLoading] = useState(false);

  // Axios instance
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
  });

  // ================= AUTH =================
  const login = async ({ email, password }) => {
    try {
      // Real backend
      // const res = await api.post("/login", { email, password });
      // setUser(res.data.user);

      // Dummy login
      const foundUser = users.find((u) => u.email === email);
      if (!foundUser) throw new Error("User not found!");
      setUser(foundUser);

      navigate("/reports");
    } catch (err) {
      console.error("Login failed:", err.message);
      throw err;
    }
  };

  const signup = async ({ username, email, password, role = "viewer" }) => {
    try {
      // Real backend
      // const res = await api.post("/signup", { username, email, password, role });
      // setUser(res.data.user);

      // Dummy signup
      const newUser = { id: `u${users.length + 1}`, username, email, role };
      users.push(newUser);
      setUser(newUser);

      navigate("/reports");
    } catch (err) {
      console.error("Signup failed:", err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  // ================= REPORTS =================
  const fetchReports = async () => {
    try {
      setLoading(true);
      // const res = await api.get("/reports");
      // setReports(res.data);
      return reports;
    } catch (err) {
      console.error("Fetch reports failed:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (newReports) => {
    try {
      // const res = await api.post("/reports", newReports);
      // setReports((prev) => [...prev, ...res.data]);

      const createdReports = newReports.map((r, idx) => ({
        id: `r${reports.length + idx + 1}`,
        userId: user?.id || "u0",
        ...r,
        status: "in-progress",
      }));

      setReports((prev) => [...prev, ...createdReports]);
      return createdReports;
    } catch (err) {
      console.error("Create report failed:", err.message);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        api,
        navigate,
        user,
        setUser,
        login,
        signup,
        logout,
        reports,
        fetchReports,
        createReport,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
