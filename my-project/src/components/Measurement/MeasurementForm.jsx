import React, { useEffect } from 'react';
import { measurementApi } from '../../api/measurementApi';
import useForm from '../../hooks/useForm';

const MeasurementForm = ({ measurement, onSuccess }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm({
    unit: '',
    value: '',
  });

  useEffect(() => {
    if (measurement) {
      setValues({
        unit: measurement.unit || '',
        value: measurement.value || '',
      });
    }
  }, [measurement]);

  const onSubmit = async (formValues) => {
    const payload = {
      unit: formValues.unit,
      value: parseFloat(formValues.value),
    };

    if (measurement) {
      await measurementApi.updateMeasurement(measurement.id, payload);
    } else {
      await measurementApi.createMeasurement(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Unit
        </label>
        <input
          type="text"
          name="unit"
          value={values.unit}
          onChange={handleChange}
          required
          placeholder="e.g., kWh, Watts, Liters"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Value
        </label>
        <input
          type="number"
          step="0.01"
          name="value"
          value={values.value}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {measurement ? 'Update Measurement' : 'Create Measurement'}
      </button>
    </form>
  );
};

export default MeasurementForm;
