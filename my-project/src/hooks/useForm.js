import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await callback(values);
    } catch (error) {
      setErrors({ submit: error.message || 'Submission failed' });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues,
  };
};

export default useForm;
