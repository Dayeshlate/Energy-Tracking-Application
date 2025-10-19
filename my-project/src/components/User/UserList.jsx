import React, { useState } from 'react';
import { userApi } from '../../api/userApi';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Table from '../Table';
import Modal from '../Modal';
import UserForm from './UserForm';
import Loader from '../Loader';

const UserList = () => {
  const { data: users, loading, error, refetch } = useFetch(() => userApi.getAllUsers());
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (val) => (val ? new Date(val).toLocaleString() : '-'),
    },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Delete user "${user.username}"?`)) {
      try {
        await userApi.deleteUser(user.id);
        refetch();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
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
        <h2 className="text-3xl font-bold text-white">Users</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          + Add User
        </button>
      </div>

      <Table
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default UserList;
