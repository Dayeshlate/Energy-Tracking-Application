import axios from './axiosConfig';

const REPORT_BASE = '/reports';

export const reportApi = {
  // GET /reports - Get all reports
  getAllReports: async () => {
    const response = await axios.get(REPORT_BASE);
    return response.data;
  },

  // GET /reports/{id} - Get report by ID
  getReportById: async (id) => {
    const response = await axios.get(`${REPORT_BASE}/${id}`);
    return response.data;
  },

  // POST /reports - Create new report
  createReport: async (reportData) => {
    const response = await axios.post(REPORT_BASE, reportData);
    return response.data;
  },

  // PUT /reports/{id} - Update report
  updateReport: async (id, reportData) => {
    const response = await axios.put(`${REPORT_BASE}/${id}`, reportData);
    return response.data;
  },

  // DELETE /reports/{id} - Delete report
  deleteReport: async (id) => {
    const response = await axios.delete(`${REPORT_BASE}/${id}`);
    return response.data;
  },

  // GET /reports/user/{userId} - Get reports by user
  getReportsByUser: async (userId) => {
    const response = await axios.get(`${REPORT_BASE}/user/${userId}`);
    return response.data;
  },

  // GET /reports/device/{deviceId} - Get reports by device
  getReportsByDevice: async (deviceId) => {
    const response = await axios.get(`${REPORT_BASE}/device/${deviceId}`);
    return response.data;
  },

  // GET /reports/date-range?startDate=&endDate= - Get reports by date range
  getReportsByDateRange: async (startDate, endDate) => {
    const response = await axios.get(`${REPORT_BASE}/date-range`, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

export default reportApi;
