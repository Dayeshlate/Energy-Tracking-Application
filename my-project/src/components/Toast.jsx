import React from 'react';

const Toast = ({ toasts, removeToast }) => {
  const typeStyles = {
    success: 'bg-green-500/20 border-green-500/50 text-green-200',
    error: 'bg-red-500/20 border-red-500/50 text-red-200',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`backdrop-blur-lg border rounded-lg p-4 shadow-lg min-w-[300px] flex items-center justify-between animate-slide-in ${
            typeStyles[toast.type] || typeStyles.info
          }`}
        >
          <p>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 hover:opacity-70"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
