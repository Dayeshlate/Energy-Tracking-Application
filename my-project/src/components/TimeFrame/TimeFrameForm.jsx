import React, { useEffect } from 'react';
import { timeFrameApi } from '../../api/timeFrameApi';
import useForm from '../../hooks/useForm';

const TimeFrameForm = ({ timeFrame, onSuccess }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm({
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (timeFrame) {
      setValues({
        startTime: timeFrame.startTime ? new Date(timeFrame.startTime).toISOString().slice(0, 16) : '',
        endTime: timeFrame.endTime ? new Date(timeFrame.endTime).toISOString().slice(0, 16) : '',
      });
    }
  }, [timeFrame]);

  const onSubmit = async (formValues) => {
    const payload = {
      startTime: new Date(formValues.startTime).toISOString(),
      endTime: new Date(formValues.endTime).toISOString(),
    };

    if (timeFrame) {
      await timeFrameApi.updateTimeFrame(timeFrame.id, payload);
    } else {
      await timeFrameApi.createTimeFrame(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Start Time
        </label>
        <input
          type="datetime-local"
          name="startTime"
          value={values.startTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          End Time
        </label>
        <input
          type="datetime-local"
          name="endTime"
          value={values.endTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {timeFrame ? 'Update Time Frame' : 'Create Time Frame'}
      </button>
    </form>
  );
};

export default TimeFrameForm;
