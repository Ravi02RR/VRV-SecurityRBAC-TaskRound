import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Shield, Copy, Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
    const { setUserDetails } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isAdmin
                ? 'http://localhost:3000/api/v1/admin/signin'
                : 'http://localhost:3000/api/v1/user/signin';

            const response = await axios.post(endpoint, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });

            const role = response.data?.admin ? 'admin' : 'user';

            setUserDetails(
                role === 'admin' ? response.data.admin : response.data.user
            );
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleQuickLogin = (type) => {
        if (type === 'user') {
            setEmail('user@gmail.com');
            setPassword('user1234');
            setIsAdmin(false);
        } else {
            setEmail('admin@gmail.com');
            setPassword('admin1234');
            setIsAdmin(true);
        }
    };

    const handleCopyCredentials = (type) => {
        const credentials = type === 'user'
            ? 'Email: user@gmail.com\nPassword: user1234'
            : 'Email: admin@gmail.com\nPassword: admin1234';

        navigator.clipboard.writeText(credentials).then(() => {
            toast.success('Credentials copied to clipboard!');
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-md">
                {/* Credentials Banner */}
                <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Quick Login Credentials</h3>
                        <p className="text-sm opacity-80">Select your login type</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleQuickLogin('user')}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                        >
                            <User className="text-white" size={20} />
                        </button>
                        <button
                            onClick={() => handleQuickLogin('admin')}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                        >
                            <Shield className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                <div className="w-full bg-white rounded-b-xl shadow-2xl overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-center mb-6">
                            {isAdmin ? (
                                <Shield className="text-red-500 mr-2" size={24} />
                            ) : (
                                <User className="text-blue-500 mr-2" size={24} />
                            )}
                            <h2 className="text-2xl font-bold text-gray-800">
                                {isAdmin ? 'Admin Login' : 'User Login'}
                            </h2>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {email && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopyCredentials(isAdmin ? 'admin' : 'user')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="admin-toggle"
                                    checked={isAdmin}
                                    onChange={() => setIsAdmin(!isAdmin)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="admin-toggle"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Login as Admin
                                </label>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={20} />
                                        {isAdmin ? 'Signing In...' : 'Signing In...'}
                                    </>
                                ) : (
                                    isAdmin ? 'Admin Sign In' : 'User Sign In'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;