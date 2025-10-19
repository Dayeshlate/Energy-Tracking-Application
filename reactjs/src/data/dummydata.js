// ===================== USERS =====================
const users = [
  { id: "u1", username: "lokesh", email: "lokesh@example.com", role: "admin" },
  { id: "u2", username: "anushka", email: "anushka@example.com", role: "manager" },
  { id: "u3", username: "vishal", email: "vishal@example.com", role: "viewer" },
  { id: "u4", username: "dayesh", email: "dayesh@example.com", role: "viewer" },
  { id: "u5", username: "shivkanya", email: "shivkanya@example.com", role: "manager" }
];

// ===================== ENERGY TYPES =====================
const energyTypes = [
  { id: "et1", name: "Solar" },
  { id: "et2", name: "Wind" },
  { id: "et3", name: "Grid Electricity" },
  { id: "et4", name: "Hydro" }
];

// ===================== ENERGY SOURCES =====================
const energySources = [
  { id: "es1", name: "Solar Panel A", typeId: "et1", capacity: 5 },
  { id: "es2", name: "Solar Panel B", typeId: "et1", capacity: 10 },
  { id: "es3", name: "Wind Turbine B", typeId: "et2", capacity: 15 },
  { id: "es4", name: "Main Grid", typeId: "et3", capacity: 100 },
  { id: "es5", name: "Hydro Station 01", typeId: "et4", capacity: 50 },
  { id: "es6", name: "Wind Turbine C", typeId: "et2", capacity: 20 },
  { id: "es7", name: "Solar Panel C", typeId: "et1", capacity: 8 }
];

// ===================== LOCATIONS =====================
const locations = [
  { id: "l1", name: "Mumbai Plant", address: "MIDC Industrial Area, Mumbai" },
  { id: "l2", name: "Pune Office", address: "Magarpatta City, Pune" },
  { id: "l3", name: "Nashik Hydro Site", address: "Godavari River, Nashik" },
  { id: "l4", name: "Aurangabad Site", address: "Industrial Zone, Aurangabad" }
];

// ===================== DEVICES =====================
const devices = [
  { id: "d1", name: "Smart Meter 01", typeId: "et1", locationId: "l1", status: "active" },
  { id: "d2", name: "Turbine Sensor 01", typeId: "et2", locationId: "l1", status: "active" },
  { id: "d3", name: "Main Grid Monitor", typeId: "et3", locationId: "l2", status: "maintenance" },
  { id: "d4", name: "Hydro Flow Sensor", typeId: "et4", locationId: "l3", status: "faulty" },
  { id: "d5", name: "Solar Panel Tracker", typeId: "et1", locationId: "l2", status: "active" },
  { id: "d6", name: "Wind Turbine Monitor", typeId: "et2", locationId: "l4", status: "inactive" },
  { id: "d7", name: "Hydro Generator Sensor", typeId: "et4", locationId: "l3", status: "active" },
  { id: "d8", name: "Grid Backup Sensor", typeId: "et3", locationId: "l1", status: "maintenance" }
];

// ===================== TIME FRAMES =====================
const timeFrames = [
  { id: "t1", start: "2025-09-01T00:00:00Z", end: "2025-09-01T12:00:00Z" },
  { id: "t2", start: "2025-09-01T12:00:00Z", end: "2025-09-02T00:00:00Z" },
  { id: "t3", start: "2025-09-02T00:00:00Z", end: "2025-09-02T12:00:00Z" }
];

// ===================== MEASUREMENTS =====================
const measurements = [
  { id: "m1", unit: "kWh", value: 120.5 },
  { id: "m2", unit: "kWh", value: 98.7 },
  { id: "m3", unit: "kWh", value: 300.1 },
  { id: "m4", unit: "kWh", value: 450.0 },
  { id: "m5", unit: "kWh", value: 220.4 },
  { id: "m6", unit: "kWh", value: 180.2 },
  { id: "m7", unit: "kWh", value: 75.8 }
];

// ===================== ENERGY CONSUMPTIONS =====================
const energyConsumptions = [
  { id: "ec1", deviceId: "d1", energySourceId: "es1", timeFrameId: "t1", measurementId: "m1" },
  { id: "ec2", deviceId: "d2", energySourceId: "es3", timeFrameId: "t1", measurementId: "m2" },
  { id: "ec3", deviceId: "d3", energySourceId: "es4", timeFrameId: "t2", measurementId: "m3" },
  { id: "ec4", deviceId: "d4", energySourceId: "es5", timeFrameId: "t2", measurementId: "m4" },
  { id: "ec5", deviceId: "d1", energySourceId: "es2", timeFrameId: "t3", measurementId: "m5" },
  { id: "ec6", deviceId: "d5", energySourceId: "es7", timeFrameId: "t3", measurementId: "m6" },
  { id: "ec7", deviceId: "d6", energySourceId: "es6", timeFrameId: "t1", measurementId: "m7" }
];

// ===================== REPORTS =====================
const reports = [
  { id: "r1", userId: "u1", deviceId: "d1", energySourceId: "es1", timeFrameId: "t1", status: "completed" },
  { id: "r2", userId: "u2", deviceId: "d3", energySourceId: "es4", timeFrameId: "t2", status: "completed" },
  { id: "r3", userId: "u1", deviceId: "d4", energySourceId: "es5", timeFrameId: "t2", status: "in-progress" }
];

// ===================== ADVICE =====================
const advices = [
  "Replace faulty devices immediately to avoid energy loss.",
  "Perform maintenance for devices under 'maintenance' status.",
  "Monitor consumption trends weekly to optimize efficiency."
];

// ===================== OPINIONS / FEEDBACK =====================
const opinions = [
  { username: "anushka", time: "2025-09-10 14:23", text: "The new solar panels have increased efficiency by 15%." },
  { username: "vishal", time: "2025-09-09 09:45", text: "Wind turbine readings are fluctuating more than expected." },
  { username: "lokesh", time: "2025-09-11 12:00", text: "Hydro sensors need calibration to match historical data." },
  { username: "dayesh", time: "2025-09-08 17:30", text: "Grid monitoring reports are consistent and accurate." },
  { username: "shivkanya", time: "2025-09-10 11:15", text: "Device alerts are timely, but dashboard refresh could be faster." },
  { username: "vishal", time: "2025-09-11 10:05", text: "AI advice suggestions are very useful for maintenance planning." }
];

export {
  users,
  energyTypes,
  energySources,
  locations,
  devices,
  timeFrames,
  measurements,
  energyConsumptions,
  reports,
  advices,
  opinions
};
