import React, { useEffect } from 'react';
import { userApi } from '../../api/userApi';
import useForm from '../../hooks/useForm';

const UserForm = ({ user, onSuccess }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setValues({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const onSubmit = async (formValues) => {
    if (user) {
      await userApi.updateUser(user.id, formValues);
    } else {
      await userApi.createUser(formValues);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all"
      >
        {user ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
