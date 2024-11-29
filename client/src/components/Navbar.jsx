import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn, LogOut, Menu, X, PlusCircle } from 'lucide-react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const Navbar = () => {
    const { userDetail, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                'https://vrv-security-rbac-task-round.vercel.app//logout',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Logout successful:', res.data);
            logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const NavLinks = () => (
        <>
            <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
            >
                Home
            </Link>

            {userDetail && userDetail.role === 'admin' && (
                <Link
                    to="/admin-dashboard"
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                >
                    Admin Dashboard
                </Link>
            )}

            {userDetail && (
                <Link
                    to="/profile"
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                    <User className="mr-1" size={18} /> Profile
                </Link>
            )}


            {userDetail && userDetail.role !== 'admin' && (
                <Link
                    to="/create-post"
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                    <PlusCircle className="mr-1" size={18} /> Create Post
                </Link>
            )}

            {!userDetail ? (
                <>
                    <Link
                        to="/login"
                        className="text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                    >
                        <LogIn className="mr-1" size={18} /> Login
                    </Link>
                    <Link
                        to="/signup"
                        className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                        Sign Up
                    </Link>
                </>
            ) : (
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center"
                >
                    <LogOut className="mr-1" size={18} /> Logout
                </button>
            )}
        </>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        VRV Security
                    </Link>

                    <div className="hidden md:flex space-x-4 items-center">
                        <NavLinks />
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-100">
                        <div className="flex flex-col space-y-2">
                            <NavLinks />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
