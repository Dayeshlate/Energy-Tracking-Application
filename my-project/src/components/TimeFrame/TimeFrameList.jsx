import React, { useState } from 'react';
import { timeFrameApi } from '../../api/timeFrameApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import TimeFrameForm from './TimeFrameForm';
import Loader from '../Loader';

const TimeFrameList = () => {
  const { data: timeFrames, loading, error, refetch } = useFetch(() =>
    timeFrameApi.getAllTimeFrames()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'startTime',
      label: 'Start Time',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
    {
      key: 'endTime',
      label: 'End Time',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
  ];

  const handleEdit = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
    openModal();
  };

  const handleDelete = async (timeFrame) => {
    if (window.confirm(`Delete time frame?`)) {
      try {
        await timeFrameApi.deleteTimeFrame(timeFrame.id);
        refetch();
      } catch (error) {
        alert('Failed to delete time frame');
      }
    }
  };

  const handleAdd = () => {
    setSelectedTimeFrame(null);
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
        <h2 className="text-3xl font-bold text-white">Time Frames</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Time Frame
        </button>
      </div>

      <Table
        columns={columns}
        data={timeFrames}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedTimeFrame ? 'Edit Time Frame' : 'Add Time Frame'}
      >
        <TimeFrameForm timeFrame={selectedTimeFrame} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default TimeFrameList;
