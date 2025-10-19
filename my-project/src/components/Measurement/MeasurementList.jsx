import React, { useState } from 'react';
import { measurementApi } from '../../api/measurementApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import MeasurementForm from './MeasurementForm';
import Loader from '../Loader';

const MeasurementList = () => {
  const { data: measurements, loading, error, refetch } = useFetch(() =>
    measurementApi.getAllMeasurements()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'unit', label: 'Unit' },
    { key: 'value', label: 'Value' },
  ];

  const handleEdit = (measurement) => {
    setSelectedMeasurement(measurement);
    openModal();
  };

  const handleDelete = async (measurement) => {
    if (window.confirm(`Delete measurement "${measurement.unit}"?`)) {
      try {
        await measurementApi.deleteMeasurement(measurement.id);
        refetch();
      } catch (error) {
        alert('Failed to delete measurement');
      }
    }
  };

  const handleAdd = () => {
    setSelectedMeasurement(null);
    openModal();
  };

  const handleFormSuccess = () => {
    closeModal();
    refetch();
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Measurements</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Measurement
        </button>
      </div>

      <Table
        columns={columns}
        data={measurements}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedMeasurement ? 'Edit Measurement' : 'Add Measurement'}
      >
        <MeasurementForm measurement={selectedMeasurement} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default MeasurementList;
