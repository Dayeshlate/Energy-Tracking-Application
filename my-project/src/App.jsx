import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Users from './pages/Users';
import Locations from './pages/Locations';
import EnergyTypes from './pages/EnergyTypes';
import EnergySources from './pages/EnergySources';
import Measurements from './pages/Measurements';
import Consumptions from './pages/Consumptions';
import Reports from './pages/Reports';
import TimeFrames from './pages/TimeFrames';
// import HomePage from './pages/HomePage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page - Standalone without Navbar/Sidebar */}
        <Route path="/" element={<Home/>} />

        {/* Dashboard Pages - With Navbar/Sidebar Layout */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/devices" element={<Devices />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/energy-types" element={<EnergyTypes />} />
                    <Route path="/energy-sources" element={<EnergySources />} />
                    <Route path="/measurements" element={<Measurements />} />
                    <Route path="/consumptions" element={<Consumptions />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/time-frames" element={<TimeFrames />} />
                  </Routes>
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
