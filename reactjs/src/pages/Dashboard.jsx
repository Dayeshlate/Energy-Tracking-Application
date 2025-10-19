/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import {
  devices,
  energyConsumptions,
  measurements,
  locations,
  energySources,
  advices,
  opinions // <- Add this in your dummydata.js
} from "../data/dummydata";

// --- Icon Library (same as before) ---
const Icons = {
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Grid: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  List: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  MapPin: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
};

export default function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAdvice, setShowAdvice] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredDevices = useMemo(() => {
    return devices
      .filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((d) => statusFilter === "all" || d.status === statusFilter)
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  }, [searchTerm, statusFilter, sortBy]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleAdvice = () => setShowAdvice((prev) => !prev);

  return (
    <div className="p-6 space-y-6 mt-12">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Device Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md ${viewMode === "grid" ? "bg-purple-500/30" : "bg-white/10"}`}
          >
            <Icons.Grid />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${viewMode === "list" ? "bg-purple-500/30" : "bg-white/10"}`}
          >
            <Icons.List />
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-md flex-1">
          <Icons.Search />
          <input
            type="text"
            placeholder="Search device..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white flex-1"
          />
        </div>

        <select
          className="bg-white/10 text-white p-2 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          className="bg-white/10 text-white p-2 rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>

        <button
          onClick={handleRefresh}
          className={`p-2 rounded-md bg-white/10 ${isRefreshing ? "animate-spin" : ""}`}
        >
          <Icons.Refresh />
        </button>
      </div>

      {/* Device Cards */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white/10 rounded-2xl p-5 flex flex-col justify-between hover:scale-105 transition-all cursor-pointer"
            onClick={() => setSelectedDevice(device)}
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-white">{device.name}</h2>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  device.status === "active" ? "bg-green-500/30" : "bg-red-500/30"
                }`}
              >
                {device.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Icons.MapPin />
              <span>{locations.find((l) => l.id === device.locationId)?.name || "Unknown Location"}</span>
            </div>
            <div className="text-sm text-gray-400 mb-3">Type: {device.typeId}</div>

            <div className="space-y-2">
              {energyConsumptions
                .filter((c) => c.deviceId === device.id)
                .map((c, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>{energySources.find((s) => s.id === c.sourceId)?.name || "Unknown Source"}</span>
                      <span>{c.value} kWh</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div
                        className="bg-cyan-400 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (c.value /
                              energyConsumptions
                                .filter((e) => e.deviceId === device.id)
                                .reduce((sum, e) => sum + e.value, 0)) *
                              100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button className="px-3 py-1 text-xs font-medium bg-purple-500/20 hover:bg-purple-500/30 text-white rounded-xl transition-all">
                View History
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-green-500/20 hover:bg-green-500/30 text-white rounded-xl transition-all">
                Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Advice Panel */}
      {showAdvice && (
        <div className="bg-purple-800/40 p-4 rounded-xl text-white mt-6">
          <h3 className="font-bold text-lg mb-2">AI Advice</h3>
          <ul className="list-disc list-inside space-y-1">
            {advices.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
          <button
            onClick={toggleAdvice}
            className="mt-3 px-3 py-1 text-sm bg-red-500/30 rounded-lg hover:bg-red-500/50 transition-all"
          >
            Close
          </button>
        </div>
      )}

      {/* Opinions Section */}
<div className="bg-white/10 p-4 rounded-xl mt-6 text-white">
  <h3 className="font-bold text-lg mb-3">Opinions & Feedback</h3>
  <div className="max-h-60 overflow-y-auto space-y-3 scrollbar-hide">
    {opinions.map((o, idx) => (
      <div key={idx} className="bg-white/5 p-3 rounded-lg">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>{o.username}</span>
          <span>{o.time}</span>
        </div>
        <p className="text-sm">{o.text}</p>
      </div>
    ))}
  </div>
</div>


      {/* Current Time */}
      <div className="text-gray-400 text-sm mt-4 flex items-center gap-1">
        <Icons.Clock /> {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}
