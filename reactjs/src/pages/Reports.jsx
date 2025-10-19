/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import {
  devices,
  energySources,
  timeFrames,
  measurements,
  locations,
  users,
} from "../data/dummydata";

export default function Reports() {
  const { navigate } = useAppContext();

  // Number of devices user wants to report for
  const [deviceCount, setDeviceCount] = useState(1);

  // Forms state array
  const [forms, setForms] = useState([
    { device: "", energySource: "", timeframe: "", value: "" },
  ]);

  // Handle input change for dynamic forms
  const handleChange = (index, e) => {
    const newForms = [...forms];
    newForms[index][e.target.name] = e.target.value;
    setForms(newForms);
  };

  // Adjust forms when deviceCount changes
  const handleDeviceCountChange = (e) => {
    const count = parseInt(e.target.value);
    setDeviceCount(count);

    const newForms = Array.from({ length: count }, (_, i) => forms[i] || { device: "", energySource: "", timeframe: "", value: "" });
    setForms(newForms);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reports Submitted:", forms);
    navigate("/dashboard"); // ✅ after filling → dashboard
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-black to-purple-900 py-12 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-3xl text-white flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Submit Device Reports</h2>

        {/* Select Number of Devices */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Number of Devices</label>
          <input
            type="number"
            min="1"
            value={deviceCount}
            onChange={handleDeviceCountChange}
            className="p-3 rounded bg-white/20 text-black"
          />
        </div>

        {/* Dynamic Device Forms */}
        {forms.map((form, index) => (
          <div
            key={index}
            className="border border-white/20 rounded-xl p-6 shadow-md bg-black/20"
          >
            <h3 className="text-xl font-semibold mb-4">Device {index + 1}</h3>

            {/* Device Selector */}
            <div className="flex flex-col gap-2 mb-3">
              <label className="font-medium">Select Device</label>
              <select
                name="device"
                value={form.device}
                onChange={(e) => handleChange(index, e)}
                className="p-3 rounded bg-white/20 text-black"
                required
              >
                <option value="">-- Choose Device --</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Energy Source */}
            <div className="flex flex-col gap-2 mb-3">
              <label className="font-medium">Energy Source</label>
              <select
                name="energySource"
                value={form.energySource}
                onChange={(e) => handleChange(index, e)}
                className="p-3 rounded bg-white/20 text-black"
                required
              >
                <option value="">-- Choose Energy Source --</option>
                {energySources.map((src) => (
                  <option key={src.id} value={src.id}>
                    {src.name} ({src.capacity})
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe */}
            <div className="flex flex-col gap-2 mb-3">
              <label className="font-medium">Timeframe</label>
              <select
                name="timeframe"
                value={form.timeframe}
                onChange={(e) => handleChange(index, e)}
                className="p-3 rounded bg-white/20 text-black"
                required
              >
                <option value="">-- Choose Timeframe --</option>
                {timeFrames.map((t) => (
                  <option key={t.id} value={t.id}>
                    {new Date(t.start).toLocaleString()} →{" "}
                    {new Date(t.end).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Value */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Consumption Value (kWh)</label>
              <input
                type="number"
                name="value"
                value={form.value}
                onChange={(e) => handleChange(index, e)}
                className="p-3 rounded bg-white/20 text-black"
                required
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 rounded-full py-3 text-white font-bold mt-4"
        >
          Submit & Go to Dashboard
        </button>
      </form>
    </div>
  );
}
