/* eslint-disable no-unused-vars */
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const goToDashboard = () => {
    if (!user) {
      navigate(" http://localhost:5174/"); // not logged in → login
    } else {
      navigate(" http://localhost:5174/"); // logged in → dashboard
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to="/">
          <img className="h-10.5 w-auto" src="/assets/logo.svg" alt="logo" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navlinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-pink-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ✅ Dashboard button */}
        <button
          
          className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 rounded-full text-white"
        >
          <a href=" http://localhost:5174/">
          Save Your Energy
          </a>
          
        </button>

        {user && (
          <button
            onClick={logout}
            className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full"
          >
            Logout
          </button>
        )}

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} />
        </button>
      </motion.nav>
    </>
  );
}
