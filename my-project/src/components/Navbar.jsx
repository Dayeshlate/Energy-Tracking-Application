import React from 'react';
import { Link } from 'react-router-dom';
import DarkGlassWrapper from './DarkGlassWrapper';

const Navbar = () => {
  return (
    <DarkGlassWrapper className="mb-6">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Energy Tracker
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/devices"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Devices
            </Link>
            <Link
              to="/consumptions"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Consumptions
            </Link>
            <Link
              to="/reports"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Reports
            </Link>
          </div>
        </div>
      </nav>
    </DarkGlassWrapper>
  );
};

export default Navbar;
