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

    const toggleUserPostPermission = async (userId, currentPostStatus) => {
        try {
            await axios.put(
                `https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/updateUserState?userid=${userId}`,
                { canPost: !currentPostStatus },
                { withCredentials: true }
            );
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user state');
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
            result = result.filter(user =>
                filterStatus === 'allowed' ? user.canPost : !user.canPost
            );
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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
            <div className="container mx-auto">
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
                            <option value="allowed">Allowed</option>
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
                                        <button
                                            onClick={() => toggleUserPostPermission(user._id, user.canPost)}
                                            className={`px-2 py-1 rounded-full text-xs flex items-center ${user.canPost
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            {user.canPost ? 'Allowed' : 'Blocked'}
                                        </button>
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
                                            onClick={() => toggleUserPostPermission(user._id, user.canPost)}
                                            className={`px-3 py-1 rounded-full text-sm flex items-center justify-center mx-auto ${user.canPost
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            {user.canPost ? (
                                                <Unlock size={16} className="mr-1" />
                                            ) : (
                                                <Lock size={16} className="mr-1" />
                                            )}
                                            {user.canPost ? 'Allowed' : 'Blocked'}
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