import React, { useEffect, useState } from 'react';
import { db } from '../configfirebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Table, Button, Modal, Input, message, Spin, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            setUsers(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                number: index + 1,
                ...doc.data(),
            })));
        });
        return unsubscribe;
    }, []);

    const addUser = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            message.warning('Please enter name, email, and password');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'users'), { name, email, password });
            message.success('User added successfully');
            setName('');
            setEmail('');
            setPassword('');
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding user:", error);
            message.error('Failed to add user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user) => {
        setEditingUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setIsEditModalOpen(true);
    };

    const editUser = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            message.warning('Please enter name, email, and password');
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, 'users', editingUserId);
            await updateDoc(userRef, { name, email, password });
            message.success('User updated successfully');
            setName('');
            setEmail('');
            setPassword('');
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error editing user:", error);
            message.error('Failed to edit user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            message.success('User deleted successfully');
        } catch (error) {
            console.error("Error deleting user:", error);
            message.error('Failed to delete user. Please try again.');
        }
    };

    const columns = [
        { title: 'No.', dataIndex: 'number', key: 'number', className: 'font-bold' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, user) => (
                <div className="flex space-x-2">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(user)}
                        className={`${
                            theme === 'dark' ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => deleteUser(user.id)}
                        className={`${
                            theme === 'dark' ? 'bg-red-800 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div
            className={`space-y-6 min-h-screen p-6 ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
            }`}
        >
            <div className="flex justify-between items-center p-4 rounded-lg shadow-lg">
                <h2 className="text-5xl font-semibold">USERS DATA</h2>
                <div className="flex items-center space-x-4">
                    <Switch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        className={`${
                            theme === 'dark' ? 'bg-green-800 hover:bg-red-500' : 'bg-black hover:bg-green-600'
                        } text-white rounded-md px-4 py-2 shadow-lg`}
                    >
                         Data
                    </Button>
                </div>
            </div>

            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 6 }}
                className={`${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                } rounded-lg shadow-lg`}
                locale={{ emptyText: "No users found" }}
            />

            {/* Add and Edit Modals */}
            <Modal
        title={isEditModalOpen ? 'Edit User' : 'Add New User'}
        open={isModalOpen || isEditModalOpen}
        onOk={isEditModalOpen ? editUser : addUser}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditModalOpen(false);
        }}
        okText={loading ? <Spin /> : isEditModalOpen ? 'Update' : 'Add'}
        cancelText="Cancel"
        okButtonProps={{ disabled: loading }}
        width="40%"
        bodyStyle={{
          padding: '20px',
          backgroundColor: theme === 'dark' ? '#333' : '#f0f2f5',
          transition: 'all 0.3s ease-in-out', // Smooth transition
        }}
        className={`transition-transform duration-500 ease-in-out ${isModalOpen ? 'scale-100' : 'scale-95'}`} // Animation on open/close
      >
        <div className="space-y-4">
          {/* Name Input */}
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className={`border-2 rounded-md py-2 px-3 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />
          
          {/* Email Input */}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className={`border-2 rounded-md py-2 px-3 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />
          
          {/* Password Input */}
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter user password"
            className={`border-2 rounded-md py-2 px-3 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Users;

