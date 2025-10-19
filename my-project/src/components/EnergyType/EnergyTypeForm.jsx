import React, { useEffect } from 'react';
import { energyTypeApi } from '../../api/energyTypeApi';
import useForm from '../../hooks/useForm';

const EnergyTypeForm = ({ energyType, onSuccess }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm({
    name: '',
  });

  useEffect(() => {
    if (energyType) {
      setValues({
        name: energyType.name || '',
      });
    }
  }, [energyType]);

  const onSubmit = async (formValues) => {
    if (energyType) {
      await energyTypeApi.updateEnergyType(energyType.id, formValues);
    } else {
      await energyTypeApi.createEnergyType(formValues);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Energy Type Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          placeholder="e.g., Electricity, Gas, Solar"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {energyType ? 'Update Energy Type' : 'Create Energy Type'}
      </button>
    </form>
  );
};

export default EnergyTypeForm;
