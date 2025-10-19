import React from 'react';

const DarkGlassWrapper = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default DarkGlassWrapper;
