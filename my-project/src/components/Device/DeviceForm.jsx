import React, { useEffect } from 'react';
import { deviceApi } from '../../api/deviceApi';
import { locationApi } from '../../api/locationApi';
import { energyTypeApi } from '../../api/energyTypeApi';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const DeviceForm = ({ device, onSuccess }) => {
  const { data: locations } = useFetch(() => locationApi.getAllLocations());
  const { data: energyTypes } = useFetch(() => energyTypeApi.getAllEnergyTypes());

  const { values, handleChange, handleSubmit, setValues } = useForm({
    name: '',
    status: 'ONLINE',
    locationId: '',
    energyTypeId: '',
  });

  useEffect(() => {
    if (device) {
      setValues({
        name: device.name || '',
        status: device.status || 'ONLINE',
        locationId: device.location?.id || '',
        energyTypeId: device.energyType?.id || '',
      });
    }
  }, [device]);

  const onSubmit = async (formValues) => {
    const payload = {
      name: formValues.name,
      status: formValues.status,
      location: { id: formValues.locationId },
      energyType: { id: formValues.energyTypeId },
    };

    if (device) {
      await deviceApi.updateDevice(device.id, payload);
    } else {
      await deviceApi.createDevice(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Device Name
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
          Status
        </label>
        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
          <option value="WARNING">Warning</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location
        </label>
        <select
          name="locationId"
          value={values.locationId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Location</option>
          {locations?.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Energy Type
        </label>
        <select
          name="energyTypeId"
          value={values.energyTypeId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Energy Type</option>
          {energyTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {device ? 'Update Device' : 'Create Device'}
      </button>
    </form>
  );
};

export default DeviceForm;
