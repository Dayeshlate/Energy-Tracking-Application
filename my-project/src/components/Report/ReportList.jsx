import React, { useState } from 'react';
import { reportApi } from '../../api/reportApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import ReportForm from './ReportForm';
import Loader from '../Loader';

const ReportList = () => {
  const { data: reports, loading, error, refetch } = useFetch(() =>
    reportApi.getAllReports()
  );
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedReport, setSelectedReport] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'user',
      label: 'User',
      render: (val) => val?.username || '-',
    },
    {
      key: 'device',
      label: 'Device',
      render: (val) => val?.name || '-',
    },
    { key: 'summary', label: 'Summary' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
  ];

  const handleEdit = (report) => {
    setSelectedReport(report);
    openModal();
  };

  const handleDelete = async (report) => {
    if (window.confirm(`Delete report?`)) {
      try {
        await reportApi.deleteReport(report.id);
        refetch();
      } catch (error) {
        alert('Failed to delete report');
      }
    }
  };

  const handleAdd = () => {
    setSelectedReport(null);
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
        <h2 className="text-3xl font-bold text-white">Reports</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add Report
        </button>
      </div>

      <Table
        columns={columns}
        data={reports}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedReport ? 'Edit Report' : 'Add Report'}
        size="lg"
      >
        <ReportForm report={selectedReport} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default ReportList;
