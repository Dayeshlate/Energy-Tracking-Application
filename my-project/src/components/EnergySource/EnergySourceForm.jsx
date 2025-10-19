import React, { useEffect } from 'react';
import { energySourceApi } from '../../api/energySourceApi';
import { energyTypeApi } from '../../api/energyTypeApi';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const EnergySourceForm = ({ energySource, onSuccess }) => {
  const { data: energyTypes } = useFetch(() => energyTypeApi.getAllEnergyTypes());

  const { values, handleChange, handleSubmit, setValues } = useForm({
    name: '',
    energyTypeId: '',
  });

  useEffect(() => {
    if (energySource) {
      setValues({
        name: energySource.name || '',
        energyTypeId: energySource.energyType?.id || '',
      });
    }
  }, [energySource]);

  const onSubmit = async (formValues) => {
    const payload = {
      name: formValues.name,
      energyType: { id: formValues.energyTypeId },
    };

    if (energySource) {
      await energySourceApi.updateEnergySource(energySource.id, payload);
    } else {
      await energySourceApi.createEnergySource(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Energy Source Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          placeholder="e.g., Main Grid, Solar Panel A"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
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
        {energySource ? 'Update Energy Source' : 'Create Energy Source'}
      </button>
    </form>
  );
};

export default EnergySourceForm;
