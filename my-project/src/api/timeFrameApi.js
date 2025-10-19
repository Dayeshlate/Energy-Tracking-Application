import axios from './axiosConfig';

const TIME_FRAME_BASE = '/time-frames';

export const timeFrameApi = {
  // GET /time-frames - Get all time frames
  getAllTimeFrames: async () => {
    const response = await axios.get(TIME_FRAME_BASE);
    return response.data;
  },

  // GET /time-frames/{id} - Get time frame by ID
  getTimeFrameById: async (id) => {
    const response = await axios.get(`${TIME_FRAME_BASE}/${id}`);
    return response.data;
  },

  // POST /time-frames - Create new time frame
  createTimeFrame: async (timeFrameData) => {
    const response = await axios.post(TIME_FRAME_BASE, timeFrameData);
    return response.data;
  },

  // PUT /time-frames/{id} - Update time frame
  updateTimeFrame: async (id, timeFrameData) => {
    const response = await axios.put(`${TIME_FRAME_BASE}/${id}`, timeFrameData);
    return response.data;
  },

  // DELETE /time-frames/{id} - Delete time frame
  deleteTimeFrame: async (id) => {
    const response = await axios.delete(`${TIME_FRAME_BASE}/${id}`);
    return response.data;
  },

  // GET /time-frames/overlapping?startTime=&endTime= - Get overlapping time frames
  getOverlappingTimeFrames: async (startTime, endTime) => {
    const response = await axios.get(`${TIME_FRAME_BASE}/overlapping`, {
      params: { startTime, endTime },
    });
    return response.data;
  },
};

export default timeFrameApi;
