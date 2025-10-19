import React from 'react';
import { Link } from 'react-router-dom';
import DeviceStats from '../Device/DeviceStats';
import DarkGlassWrapper from '../DarkGlassWrapper';
import { deviceApi } from '../../api/deviceApi';
import { consumptionApi } from '../../api/consumptionApi';
import useFetch from '../../hooks/useFetch';

const DashboardHome = () => {
  const { data: devices } = useFetch(() => deviceApi.getAllDevices());
  const { data: consumptions } = useFetch(() => consumptionApi.getAllConsumptions());

  const quickLinks = [
    { title: 'Devices', icon: 'D', path: '/devices', color: 'from-blue-500 to-cyan-500' },
    { title: 'Consumptions', icon: 'C', path: '/consumptions', color: 'from-green-500 to-emerald-500' },
    { title: 'Reports', icon: 'R', path: '/reports', color: 'from-purple-500 to-pink-500' },
    { title: 'Users', icon: 'U', path: '/users', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Energy Tracker Dashboard
        </h1>
        <p className="text-gray-400">Monitor and manage your energy consumption</p>
      </div>

      {/* Device Statistics */}
      <DeviceStats />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DarkGlassWrapper className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Total Devices</h3>
          <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {devices?.length || 0}
          </p>
        </DarkGlassWrapper>

        <DarkGlassWrapper className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Total Consumptions</h3>
          <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {consumptions?.length || 0}
          </p>
        </DarkGlassWrapper>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <DarkGlassWrapper className="p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                </div>
              </DarkGlassWrapper>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <DarkGlassWrapper className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {consumptions?.slice(0, 5).map((consumption, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{consumption.device?.name || 'Device'}</p>
                <p className="text-gray-400 text-sm">
                  {consumption.measurement?.value} {consumption.measurement?.unit}
                </p>
              </div>
              <p className="text-gray-500 text-sm">
                {consumption.recordedAt ? new Date(consumption.recordedAt).toLocaleString() : '-'}
              </p>
            </div>
          ))}
          {(!consumptions || consumptions.length === 0) && (
            <p className="text-gray-400 text-center py-4">No recent activity</p>
          )}
        </div>
      </DarkGlassWrapper>
    </div>
  );
};

export default DashboardHome;
