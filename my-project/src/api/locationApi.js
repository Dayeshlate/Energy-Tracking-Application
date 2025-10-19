import axios from './axiosConfig';

const LOCATION_BASE = '/locations';

export const locationApi = {
  // GET /locations - Get all locations
  getAllLocations: async () => {
    const response = await axios.get(LOCATION_BASE);
    return response.data;
  },

  // GET /locations/{id} - Get location by ID
  getLocationById: async (id) => {
    const response = await axios.get(`${LOCATION_BASE}/${id}`);
    return response.data;
  },

  // POST /locations - Create new location
  createLocation: async (locationData) => {
    const response = await axios.post(LOCATION_BASE, locationData);
    return response.data;
  },

  // PUT /locations/{id} - Update location
  updateLocation: async (id, locationData) => {
    const response = await axios.put(`${LOCATION_BASE}/${id}`, locationData);
    return response.data;
  },

  // DELETE /locations/{id} - Delete location
  deleteLocation: async (id) => {
    const response = await axios.delete(`${LOCATION_BASE}/${id}`);
    return response.data;
  },
};

export default locationApi;
