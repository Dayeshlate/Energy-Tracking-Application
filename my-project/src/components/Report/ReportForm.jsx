import React, { useEffect } from 'react';
import { reportApi } from '../../api/reportApi';
import { userApi } from '../../api/userApi';
import { deviceApi } from '../../api/deviceApi';
import { energySourceApi } from '../../api/energySourceApi';
import { timeFrameApi } from '../../api/timeFrameApi';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const ReportForm = ({ report, onSuccess }) => {
  const { data: users } = useFetch(() => userApi.getAllUsers());
  const { data: devices } = useFetch(() => deviceApi.getAllDevices());
  const { data: energySources } = useFetch(() => energySourceApi.getAllEnergySources());
  const { data: timeFrames } = useFetch(() => timeFrameApi.getAllTimeFrames());

  const { values, handleChange, handleSubmit, setValues } = useForm({
    userId: '',
    deviceId: '',
    energySourceId: '',
    timeFrameId: '',
    summary: '',
  });

  useEffect(() => {
    if (report) {
      setValues({
        userId: report.user?.id || '',
        deviceId: report.device?.id || '',
        energySourceId: report.energySource?.id || '',
        timeFrameId: report.timeFrame?.id || '',
        summary: report.summary || '',
      });
    }
  }, [report]);

  const onSubmit = async (formValues) => {
    const payload = {
      user: { id: formValues.userId },
      device: { id: formValues.deviceId },
      energySource: { id: formValues.energySourceId },
      timeFrame: { id: formValues.timeFrameId },
      summary: formValues.summary,
    };

    if (report) {
      await reportApi.updateReport(report.id, payload);
    } else {
      await reportApi.createReport(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          User
        </label>
        <select
          name="userId"
          value={values.userId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select User</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Device
        </label>
        <select
          name="deviceId"
          value={values.deviceId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Device</option>
          {devices?.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Energy Source
        </label>
        <select
          name="energySourceId"
          value={values.energySourceId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Energy Source</option>
          {energySources?.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Time Frame
        </label>
        <select
          name="timeFrameId"
          value={values.timeFrameId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Time Frame</option>
          {timeFrames?.map((tf) => (
            <option key={tf.id} value={tf.id}>
              {new Date(tf.startTime).toLocaleString()} - {new Date(tf.endTime).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Summary
        </label>
        <textarea
          name="summary"
          value={values.summary}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Enter report summary..."
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {report ? 'Update Report' : 'Create Report'}
      </button>
    </form>
  );
};

export default ReportForm;
