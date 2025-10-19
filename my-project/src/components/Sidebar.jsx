import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkGlassWrapper from './DarkGlassWrapper';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'H' },
    { path: '/devices', label: 'Devices', icon: 'D' },
    { path: '/users', label: 'Users', icon: 'U' },
    { path: '/locations', label: 'Locations', icon: 'L' },
    { path: '/energy-types', label: 'Energy Types', icon: 'E' },
    { path: '/energy-sources', label: 'Energy Sources', icon: 'S' },
    { path: '/measurements', label: 'Measurements', icon: 'M' },
    { path: '/consumptions', label: 'Consumptions', icon: 'C' },
    { path: '/reports', label: 'Reports', icon: 'R' },
    { path: '/time-frames', label: 'Time Frames', icon: 'T' },
  ];

  return (
    <DarkGlassWrapper
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 h-screen sticky top-0 p-4 m-1`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-6 p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
      >
        {isOpen ? '◀' : '▶'}
      </button>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-500/50'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </DarkGlassWrapper>
  );
};

export default Sidebar;
