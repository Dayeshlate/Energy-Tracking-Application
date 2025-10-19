import React, { useState } from 'react';
import { deviceApi } from '../../api/deviceApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import DeviceForm from './DeviceForm';
import Loader from '../Loader';

const DeviceList = () => {
  const { data: devices, loading, error, refetch } = useFetch(() => deviceApi.getAllDevices());
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'energyType',
      label: 'Energy Type',
      render: (val) => val?.name || '-',
    },
    {
      key: 'location',
      label: 'Location',
      render: (val) => val?.name || '-',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            val === 'ONLINE'
              ? 'bg-green-500/20 text-green-300'
              : val === 'OFFLINE'
              ? 'bg-red-500/20 text-red-300'
              : 'bg-yellow-500/20 text-yellow-300'
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
  ];

  const handleEdit = (device) => {
    setSelectedDevice(device);
    openModal();
  };

  const handleDelete = async (device) => {
    if (window.confirm(`Delete device "${device.name}"?`)) {
      try {
        await deviceApi.deleteDevice(device.id);
        refetch();
      } catch (error) {
        alert('Failed to delete device');
        console.log(error);
        
      }
    }
  };

  const handleAdd = () => {
    setSelectedDevice(null);
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
        <h2 className="text-3xl font-bold text-white">Devices</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Device
        </button>
      </div>

      <Table
        columns={columns}
        data={devices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedDevice ? 'Edit Device' : 'Add Device'}
      >
        <DeviceForm device={selectedDevice} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default DeviceList;
