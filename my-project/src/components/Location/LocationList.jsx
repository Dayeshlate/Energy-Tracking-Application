import React, { useState } from 'react';
import { locationApi } from '../../api/locationApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import LocationForm from './LocationForm';
import Loader from '../Loader';

const LocationList = () => {
  const { data: locations, loading, error, refetch } = useFetch(() =>
    locationApi.getAllLocations()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
  ];

  const handleEdit = (location) => {
    setSelectedLocation(location);
    openModal();
  };

  const handleDelete = async (location) => {
    if (window.confirm(`Delete location "${location.name}"?`)) {
      try {
        await locationApi.deleteLocation(location.id);
        refetch();
      } catch (error) {
        alert('Failed to delete location');
      }
    }
  };

  const handleAdd = () => {
    setSelectedLocation(null);
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
        <h2 className="text-3xl font-bold text-white">Locations</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Location
        </button>
      </div>

      <Table
        columns={columns}
        data={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedLocation ? 'Edit Location' : 'Add Location'}
      >
        <LocationForm location={selectedLocation} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default LocationList;
