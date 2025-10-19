import axios from './axiosConfig';

const CONSUMPTION_BASE = '/consumptions';

export const consumptionApi = {
  // GET /consumptions - Get all consumptions
  getAllConsumptions: async () => {
    const response = await axios.get(CONSUMPTION_BASE);
    return response.data;
  },

  // GET /consumptions/{id} - Get consumption by ID
  getConsumptionById: async (id) => {
    const response = await axios.get(`${CONSUMPTION_BASE}/${id}`);
    return response.data;
  },

  // POST /consumptions - Create new consumption
  createConsumption: async (consumptionData) => {
    const response = await axios.post(CONSUMPTION_BASE, consumptionData);
    return response.data;
  },

  // PUT /consumptions/{id} - Update consumption
  updateConsumption: async (id, consumptionData) => {
    const response = await axios.put(`${CONSUMPTION_BASE}/${id}`, consumptionData);
    return response.data;
  },

  // DELETE /consumptions/{id} - Delete consumption
  deleteConsumption: async (id) => {
    const response = await axios.delete(`${CONSUMPTION_BASE}/${id}`);
    return response.data;
  },

  // GET /consumptions/device/{deviceId} - Get consumptions by device
  getConsumptionsByDevice: async (deviceId) => {
    const response = await axios.get(`${CONSUMPTION_BASE}/device/${deviceId}`);
    return response.data;
  },

  // GET /consumptions/device/{deviceId}/total - Get total consumption by device
  getTotalConsumptionByDevice: async (deviceId) => {
    const response = await axios.get(`${CONSUMPTION_BASE}/device/${deviceId}/total`);
    return response.data;
  },

  // GET /consumptions/date-range?startDate=&endDate= - Get consumptions by date range
  getConsumptionsByDateRange: async (startDate, endDate) => {
    const response = await axios.get(`${CONSUMPTION_BASE}/date-range`, {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // GET /consumptions/device/{deviceId}/date-range?startDate=&endDate= - Get consumptions by device and date range
  getConsumptionsByDeviceAndDateRange: async (deviceId, startDate, endDate) => {
    const response = await axios.get(`${CONSUMPTION_BASE}/device/${deviceId}/date-range`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

export default consumptionApi;
