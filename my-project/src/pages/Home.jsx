import React from 'react';
import { Link } from 'react-router-dom';
import DarkGlassWrapper from '../components/DarkGlassWrapper';

const Home = () => {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Monitoring',
      description: 'Track energy usage across all your devices in real-time with live updates and instant notifications.',
    },
    {
      icon: '📈',
      title: 'Advanced Analytics',
      description: 'Comprehensive energy analytics with detailed reports, charts, and consumption patterns.',
    },
    {
      icon: '🔌',
      title: 'Device Management',
      description: 'Manage all your energy-consuming devices from a single, intuitive dashboard.',
    },
    {
      icon: '📄',
      title: 'Custom Reports',
      description: 'Generate detailed reports for any time period with customizable parameters.',
    },
    {
      icon: '🔋',
      title: 'Energy Sources',
      description: 'Track multiple energy sources including solar, grid, and alternative power.',
    },
    {
      icon: '⚡',
      title: 'Efficiency Insights',
      description: 'Get actionable insights to reduce energy consumption and optimize usage.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <DarkGlassWrapper className="max-w-6xl w-full p-12 text-center animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl hover-lift">
              ⚡
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse-slow">
              Energy Tracker
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Monitor, analyze, and optimize your energy consumption with powerful real-time tracking and analytics
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-2xl hover:scale-105"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/devices"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all border border-white/20 hover:border-white/40"
            >
              📱 View Devices
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/50 hover-lift"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">24/7</p>
              <p className="text-gray-400">Real-time Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-400 mb-2">100+</p>
              <p className="text-gray-400">Devices Supported</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">∞</p>
              <p className="text-gray-400">Scalability</p>
            </div>
          </div>
        </DarkGlassWrapper>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500">
        <p>©  Energy Tracking Application For FSJP Project</p>
      </div>
    </div>
  );
};

export default Home;
