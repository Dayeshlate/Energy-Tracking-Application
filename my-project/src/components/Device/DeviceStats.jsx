import React from 'react';
import { deviceApi } from '../../api/deviceApi';
import useFetch from '../../hooks/useFetch';
import DarkGlassWrapper from '../DarkGlassWrapper';

const DeviceStats = () => {
  const { data: stats, loading } = useFetch(() => deviceApi.getDeviceStats());

  if (loading) {
    return <div className="text-gray-400">Loading stats...</div>;
  }

  const statCards = [
    {
      label: 'Total Devices',
      value: stats?.total || 0,
      icon: 'D',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Online',
      value: stats?.online || 0,
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Offline',
      value: stats?.offline || 0,
      icon: '❌',
      color: 'from-red-500 to-pink-500',
    },
    {
      label: 'Warning',
      value: stats?.warning || 0,
      icon: '⚠️',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, idx) => (
        <DarkGlassWrapper key={idx} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div
              className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl`}
            >
              {stat.icon}
            </div>
          </div>
        </DarkGlassWrapper>
      ))}
    </div>
  );
};

export default DeviceStats;
