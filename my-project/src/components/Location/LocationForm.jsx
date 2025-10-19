import React, { useEffect } from 'react';
import { locationApi } from '../../api/locationApi';
import useForm from '../../hooks/useForm';

const LocationForm = ({ location, onSuccess }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm({
    name: '',
    address: '',
  });

  useEffect(() => {
    if (location) {
      setValues({
        name: location.name || '',
        address: location.address || '',
      });
    }
  }, [location]);

  const onSubmit = async (formValues) => {
    if (location) {
      await locationApi.updateLocation(location.id, formValues);
    } else {
      await locationApi.createLocation(formValues);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={values.address}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {location ? 'Update Location' : 'Create Location'}
      </button>
    </form>
  );
};

export default LocationForm;
