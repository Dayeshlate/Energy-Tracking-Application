import React, { useState } from 'react';
import { consumptionApi } from '../../api/consumptionApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import ConsumptionForm from './ConsumptionForm';
import Loader from '../Loader';

const ConsumptionList = () => {
  const { data: consumptions, loading, error, refetch } = useFetch(() =>
    consumptionApi.getAllConsumptions()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedConsumption, setSelectedConsumption] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'device',
      label: 'Device',
      render: (val) => val?.name || '-',
    },
    {
      key: 'energySource',
      label: 'Energy Source',
      render: (val) => val?.name || '-',
    },
    {
      key: 'measurement',
      label: 'Measurement',
      render: (val) => (val ? `${val.value} ${val.unit}` : '-'),
    },
    {
      key: 'recordedAt',
      label: 'Recorded At',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
  ];

  const handleEdit = (consumption) => {
    setSelectedConsumption(consumption);
    openModal();
  };

  const handleDelete = async (consumption) => {
    if (window.confirm(`Delete consumption record?`)) {
      try {
        await consumptionApi.deleteConsumption(consumption.id);
        refetch();
      } catch (error) {
        alert('Failed to delete consumption');
      }
    }
  };

  const handleAdd = () => {
    setSelectedConsumption(null);
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
        <h2 className="text-3xl font-bold text-white">Energy Consumptions</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Consumption
        </button>
      </div>

      <Table
        columns={columns}
        data={consumptions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedConsumption ? 'Edit Consumption' : 'Add Consumption'}
        size="lg"
      >
        <ConsumptionForm consumption={selectedConsumption} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default ConsumptionList;
