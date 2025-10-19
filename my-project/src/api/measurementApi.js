import axios from './axiosConfig';

const MEASUREMENT_BASE = '/measurements';

export const measurementApi = {
  // GET /measurements - Get all measurements
  getAllMeasurements: async () => {
    const response = await axios.get(MEASUREMENT_BASE);
    return response.data;
  },

  // GET /measurements/{id} - Get measurement by ID
  getMeasurementById: async (id) => {
    const response = await axios.get(`${MEASUREMENT_BASE}/${id}`);
    return response.data;
  },

  // POST /measurements - Create new measurement
  createMeasurement: async (measurementData) => {
    const response = await axios.post(MEASUREMENT_BASE, measurementData);
    return response.data;
  },

  // PUT /measurements/{id} - Update measurement
  updateMeasurement: async (id, measurementData) => {
    const response = await axios.put(`${MEASUREMENT_BASE}/${id}`, measurementData);
    return response.data;
  },

  // DELETE /measurements/{id} - Delete measurement
  deleteMeasurement: async (id) => {
    const response = await axios.delete(`${MEASUREMENT_BASE}/${id}`);
    return response.data;
  },

  // GET /measurements/unit/{unit} - Get measurements by unit
  getMeasurementsByUnit: async (unit) => {
    const response = await axios.get(`${MEASUREMENT_BASE}/unit/${unit}`);
    return response.data;
  },
};

export default measurementApi;
