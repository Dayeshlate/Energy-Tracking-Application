import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";











import Login from "./pages/Login";
import { AppContextProvider } from "./context/Appcontext";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <AppContextProvider>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </AppContextProvider>
    );
}
