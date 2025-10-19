import React, { useEffect } from 'react';
import { consumptionApi } from '../../api/consumptionApi';
import { deviceApi } from '../../api/deviceApi';
import { energySourceApi } from '../../api/energySourceApi';
import { measurementApi } from '../../api/measurementApi';
import { timeFrameApi } from '../../api/timeFrameApi';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const ConsumptionForm = ({ consumption, onSuccess }) => {
  const { data: devices } = useFetch(() => deviceApi.getAllDevices());
  const { data: energySources } = useFetch(() => energySourceApi.getAllEnergySources());
  const { data: measurements } = useFetch(() => measurementApi.getAllMeasurements());
  const { data: timeFrames } = useFetch(() => timeFrameApi.getAllTimeFrames());

  const { values, handleChange, handleSubmit, setValues } = useForm({
    deviceId: '',
    energySourceId: '',
    measurementId: '',
    timeFrameId: '',
  });

  useEffect(() => {
    if (consumption) {
      setValues({
        deviceId: consumption.device?.id || '',
        energySourceId: consumption.energySource?.id || '',
        measurementId: consumption.measurement?.id || '',
        timeFrameId: consumption.timeFrame?.id || '',
      });
    }
  }, [consumption]);

  const onSubmit = async (formValues) => {
    const payload = {
      device: { id: formValues.deviceId },
      energySource: { id: formValues.energySourceId },
      measurement: { id: formValues.measurementId },
      timeFrame: { id: formValues.timeFrameId },
    };

    if (consumption) {
      await consumptionApi.updateConsumption(consumption.id, payload);
    } else {
      await consumptionApi.createConsumption(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Measurement
        </label>
        <select
          name="measurementId"
          value={values.measurementId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Measurement</option>
          {measurements?.map((measurement) => (
            <option key={measurement.id} value={measurement.id}>
              {measurement.value} {measurement.unit}
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

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {consumption ? 'Update Consumption' : 'Create Consumption'}
      </button>
    </form>
  );
};

export default ConsumptionForm;
