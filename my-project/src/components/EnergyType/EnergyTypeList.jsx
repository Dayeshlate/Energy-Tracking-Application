import React, { useState } from 'react';
import { energyTypeApi } from '../../api/energyTypeApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import EnergyTypeForm from './EnergyTypeForm';
import Loader from '../Loader';

const EnergyTypeList = () => {
  const { data: energyTypes, loading, error, refetch } = useFetch(() =>
    energyTypeApi.getAllEnergyTypes()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedEnergyType, setSelectedEnergyType] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  const handleEdit = (energyType) => {
    setSelectedEnergyType(energyType);
    openModal();
  };

  const handleDelete = async (energyType) => {
    if (window.confirm(`Delete energy type "${energyType.name}"?`)) {
      try {
        await energyTypeApi.deleteEnergyType(energyType.id);
        refetch();
      } catch (error) {
        alert('Failed to delete energy type');
      }
    }
  };

  const handleAdd = () => {
    setSelectedEnergyType(null);
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
        <h2 className="text-3xl font-bold text-white">Energy Types</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Energy Type
        </button>
      </div>

      <Table
        columns={columns}
        data={energyTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedEnergyType ? 'Edit Energy Type' : 'Add Energy Type'}
      >
        <EnergyTypeForm energyType={selectedEnergyType} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default EnergyTypeList;
