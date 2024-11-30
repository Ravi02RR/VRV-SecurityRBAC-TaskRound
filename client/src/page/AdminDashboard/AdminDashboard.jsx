/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Trash2, Lock, Unlock, Search, } from 'lucide-react';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0 });
    const { userDetail } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userDetail || userDetail.role !== 'admin') {
            navigate('/login');
        }
    }, [userDetail, navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/getallusers', { withCredentials: true });
            setUsers(response.data.users);
            setFilteredUsers(response.data.users);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get('https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/getstats', { withCredentials: true });
            setStats(response.data.stats);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    };



    const togglePostPermission = async (userId, currentPostStatus) => {
        try {
            await axios.put(
                `https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/updateUserState?userid=${userId}`,
                { canPost: !currentPostStatus },
                { withCredentials: true }
            );
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post permission');
        }
    };

    const toggleLoginBlock = async (userId, currentBlockStatus) => {
        try {
            await axios.put(
                `https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/blockuser?userId=${userId}`,
                {},
                { withCredentials: true }
            );
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to toggle user block status');
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/deleteuser?userId=${userId}`, { withCredentials: true });
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete user');
        }
    };

    useEffect(() => {
        let result = users;

        if (filterStatus !== 'all') {
            result = result.filter(user => {
                if (filterStatus === 'allowed')
                    return user.canPost && !user.isBlocked;
                if (filterStatus === 'blocked')
                    return !user.canPost || user.isBlocked;
                return true;
            });
        }

        if (searchTerm) {
            result = result.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [users, searchTerm, filterStatus]);

    useEffect(() => {
        if (userDetail && userDetail.role === 'admin') {
            fetchUsers();
            fetchStats();
        }
    }, [userDetail]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-xl text-gray-600 flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading users...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                    <div className="text-xl text-red-600 mb-4">{error}</div>
                    <button
                        onClick={fetchUsers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 mt-16">
            <div className="container mx-auto">
                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-700">Total Posts</h2>
                        <p className="text-2xl font-bold text-green-600">{stats.totalPosts}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Admin Dashboard</h1>

                    <div className="flex space-x-2 w-full md:w-auto">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Users</option>
                            <option value="allowed">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Mobile Responsive Table */}
                    <div className="block md:hidden">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No users found
                            </div>
                        ) : (
                            filteredUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="border-b p-4 flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div>
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex flex-col space-y-2">
                                            <button
                                                onClick={() => togglePostPermission(user._id, user.canPost)}
                                                className={`px-2 py-1 rounded-full text-xs flex items-center ${user.canPost
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                    }`}
                                            >
                                                {user.canPost ? 'Can Post' : 'Cannot Post'}
                                            </button>
                                            <button
                                                onClick={() => toggleLoginBlock(user._id, user.isBlocked)}
                                                className={`px-2 py-1 rounded-full text-xs flex items-center ${user.isBlocked
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-green-500 text-white'
                                                    }`}
                                            >
                                                {user.isBlocked ? 'Blocked Login' : 'Login Active'}
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete User"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <table className="w-full hidden md:table">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-center">Post Permission</th>
                                <th className="px-4 py-3 text-center">Login Status</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => togglePostPermission(user._id, user.canPost)}
                                            className={`px-3 py-1 rounded-full text-sm flex items-center justify-center mx-auto ${user.canPost
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            {user.canPost ? 'Can Post' : 'Cannot Post'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => toggleLoginBlock(user._id, user.isBlocked)}
                                            className={`px-3 py-1 rounded-full text-sm flex items-center justify-center mx-auto ${user.isBlocked
                                                ? 'bg-red-500 text-white'
                                                : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {user.isBlocked ? 'Blocked Login' : 'Login Active'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete User"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No users found
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;