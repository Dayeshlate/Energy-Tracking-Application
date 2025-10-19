import axios from './axiosConfig';

const DEVICE_BASE = '/devices';

export const deviceApi = {
  // GET /devices - Get all devices
  getAllDevices: async () => {
    const response = await axios.get(DEVICE_BASE);
    return response.data;
  },

  // GET /devices/{id} - Get device by ID
  getDeviceById: async (id) => {
    const response = await axios.get(`${DEVICE_BASE}/${id}`);
    return response.data;
  },

  // POST /devices - Create new device
  createDevice: async (deviceData) => {
    const response = await axios.post(DEVICE_BASE, deviceData);
    return response.data;
  },

  // PUT /devices/{id} - Update device
  updateDevice: async (id, deviceData) => {
    const response = await axios.put(`${DEVICE_BASE}/${id}`, deviceData);
    return response.data;
  },

  // DELETE /devices/{id} - Delete device
  deleteDevice: async (id) => {
    const response = await axios.delete(`${DEVICE_BASE}/${id}`);
    return response.data;
  },

  // GET /devices/location/{locationId} - Get devices by location
  getDevicesByLocation: async (locationId) => {
    const response = await axios.get(`${DEVICE_BASE}/location/${locationId}`);
    return response.data;
  },

  // GET /devices/energy-type/{energyTypeId} - Get devices by energy type
  getDevicesByEnergyType: async (energyTypeId) => {
    const response = await axios.get(`${DEVICE_BASE}/energy-type/${energyTypeId}`);
    return response.data;
  },

  // GET /devices/status/{status} - Get devices by status
  getDevicesByStatus: async (status) => {
    const response = await axios.get(`${DEVICE_BASE}/status/${status}`);
    return response.data;
  },

  // GET /devices/stats - Get device statistics
  getDeviceStats: async () => {
    const response = await axios.get(`${DEVICE_BASE}/stats`);
    return response.data;
  },
};

export default deviceApi;
