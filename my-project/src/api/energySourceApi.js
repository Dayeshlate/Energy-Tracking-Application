import axios from './axiosConfig';

const ENERGY_SOURCE_BASE = '/energy-sources';

export const energySourceApi = {
  // GET /energy-sources - Get all energy sources
  getAllEnergySources: async () => {
    const response = await axios.get(ENERGY_SOURCE_BASE);
    return response.data;
  },

  // GET /energy-sources/{id} - Get energy source by ID
  getEnergySourceById: async (id) => {
    const response = await axios.get(`${ENERGY_SOURCE_BASE}/${id}`);
    return response.data;
  },

  // POST /energy-sources - Create new energy source
  createEnergySource: async (energySourceData) => {
    const response = await axios.post(ENERGY_SOURCE_BASE, energySourceData);
    return response.data;
  },

  // PUT /energy-sources/{id} - Update energy source
  updateEnergySource: async (id, energySourceData) => {
    const response = await axios.put(`${ENERGY_SOURCE_BASE}/${id}`, energySourceData);
    return response.data;
  },

  // DELETE /energy-sources/{id} - Delete energy source
  deleteEnergySource: async (id) => {
    const response = await axios.delete(`${ENERGY_SOURCE_BASE}/${id}`);
    return response.data;
  },

  // GET /energy-sources/energy-type/{energyTypeId} - Get energy sources by type
  getEnergySourcesByType: async (energyTypeId) => {
    const response = await axios.get(`${ENERGY_SOURCE_BASE}/energy-type/${energyTypeId}`);
    return response.data;
  },
};

export default energySourceApi;
