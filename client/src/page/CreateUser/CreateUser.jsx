/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        canPost: false,
        isBlocked: false
    });

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/getallusers', {
                withCredentials: true
            });
            setUsers(response.data.users);
            setFilteredUsers(response.data.users);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            setLoading(false);
        }
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                'https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/createuser',
                formData,
                { withCredentials: true }
            );

            setSuccessMessage('User created successfully!');
            setFormData({
                name: '',
                email: '',
                password: '',
                canPost: false,
                isBlocked: false
            });

            fetchUsers();

            setTimeout(() => setSuccessMessage(null), 3000);

            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create user');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all"
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-center">
                    <UserPlus className="mr-3 text-white" size={32} />
                    <h2 className="text-2xl font-bold text-white">Create New User</h2>
                </div>

                <div className="p-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg"
                        >
                            <div className="flex items-center">
                                <AlertCircle className="mr-2 text-red-500" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg"
                        >
                            <div className="flex items-center">
                                <CheckCircle className="mr-2 text-green-500" />
                                <p className="text-green-700">{successMessage}</p>
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={createUser} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="canPost"
                                    checked={formData.canPost}
                                    onChange={handleInputChange}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="canPost" className="ml-2 text-sm text-gray-900">
                                    Can Post
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isBlocked"
                                    checked={formData.isBlocked}
                                    onChange={handleInputChange}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isBlocked" className="ml-2 text-sm text-gray-900">
                                    Is Blocked
                                </label>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                }`}
                        >
                            {loading ? 'Creating...' : 'Create User'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateUser;