import axios from './axiosConfig';

const ENERGY_TYPE_BASE = '/energy-types';

export const energyTypeApi = {
  // GET /energy-types - Get all energy types
  getAllEnergyTypes: async () => {
    const response = await axios.get(ENERGY_TYPE_BASE);
    return response.data;
  },

  // GET /energy-types/{id} - Get energy type by ID
  getEnergyTypeById: async (id) => {
    const response = await axios.get(`${ENERGY_TYPE_BASE}/${id}`);
    return response.data;
  },

  // POST /energy-types - Create new energy type
  createEnergyType: async (energyTypeData) => {
    const response = await axios.post(ENERGY_TYPE_BASE, energyTypeData);
    return response.data;
  },

  // PUT /energy-types/{id} - Update energy type
  updateEnergyType: async (id, energyTypeData) => {
    const response = await axios.put(`${ENERGY_TYPE_BASE}/${id}`, energyTypeData);
    return response.data;
  },

  // DELETE /energy-types/{id} - Delete energy type
  deleteEnergyType: async (id) => {
    const response = await axios.delete(`${ENERGY_TYPE_BASE}/${id}`);
    return response.data;
  },
};

export default energyTypeApi;
