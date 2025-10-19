import axios from './axiosConfig';

const USER_BASE = '/users';

export const userApi = {
  // GET /users - Get all users
  getAllUsers: async () => {
    const response = await axios.get(USER_BASE);
    return response.data;
  },

  // GET /users/{id} - Get user by ID
  getUserById: async (id) => {
    const response = await axios.get(`${USER_BASE}/${id}`);
    return response.data;
  },

  // POST /users - Create new user
  createUser: async (userData) => {
    const response = await axios.post(USER_BASE, userData);
    return response.data;
  },

  // PUT /users/{id} - Update user
  updateUser: async (id, userData) => {
    const response = await axios.put(`${USER_BASE}/${id}`, userData);
    return response.data;
  },

  // DELETE /users/{id} - Delete user
  deleteUser: async (id) => {
    const response = await axios.delete(`${USER_BASE}/${id}`);
    return response.data;
  },
};

export default userApi;
