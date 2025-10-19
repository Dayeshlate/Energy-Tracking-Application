import React, { useState } from 'react';
import { energySourceApi } from '../../api/energySourceApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import EnergySourceForm from './EnergySourceForm';
import Loader from '../Loader';

const EnergySourceList = () => {
  const { data: energySources, loading, error, refetch } = useFetch(() =>
    energySourceApi.getAllEnergySources()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedEnergySource, setSelectedEnergySource] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'energyType',
      label: 'Energy Type',
      render: (val) => val?.name || '-',
    },
  ];

  const handleEdit = (energySource) => {
    setSelectedEnergySource(energySource);
    openModal();
  };

  const handleDelete = async (energySource) => {
    if (window.confirm(`Delete energy source "${energySource.name}"?`)) {
      try {
        await energySourceApi.deleteEnergySource(energySource.id);
        refetch();
      } catch (error) {
        alert('Failed to delete energy source');
      }
    }
  };

  const handleAdd = () => {
    setSelectedEnergySource(null);
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
        <h2 className="text-3xl font-bold text-white">Energy Sources</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Energy Source
        </button>
      </div>

      <Table
        columns={columns}
        data={energySources}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedEnergySource ? 'Edit Energy Source' : 'Add Energy Source'}
      >
        <EnergySourceForm energySource={selectedEnergySource} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default EnergySourceList;
