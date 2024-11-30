import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, LogIn, LogOut, Menu, X, PlusCircle, Loader2,
    Home, ShieldCheck, UserPlus, UserPlus as CreateUserIcon
} from 'lucide-react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const Navbar = () => {
    const { userDetail, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await axios.post(
                'https://vrv-securityrbac-taskround.onrender.com/logout',
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line react/prop-types
    const NavLinks = ({ mobile = false }) => {
        const linkStyle = mobile
            ? "group flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
            : "group flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-50 hover:text-blue-600";

        const iconStyle = "text-gray-500 group-hover:text-blue-600 transition-colors";

        return (
            <motion.div
                initial={{ opacity: 0, y: mobile ? 20 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: mobile ? 20 : 0 }}
                transition={{ duration: 0.3 }}
                className={mobile
                    ? "flex flex-col items-center justify-center space-y-4 h-full w-full p-6"
                    : "flex space-x-2 items-center"
                }
            >
                {[
                    { to: '/', label: 'Home', icon: Home },
                    ...(userDetail?.role === 'admin'
                        ? [
                            { to: '/admin-dashboard', label: 'Dashboard', icon: ShieldCheck },
                            { to: '/create-user', label: 'Create User', icon: CreateUserIcon }
                        ]
                        : []),
                    ...(userDetail
                        ? [
                            { to: '/profile', label: 'Profile', icon: User },
                            ...(userDetail.role !== 'admin'
                                ? [{ to: '/create-post', label: 'Create', icon: PlusCircle }]
                                : [])
                        ]
                        : []),
                    ...(!userDetail
                        ? [
                            { to: '/login', label: 'Login', icon: LogIn },
                            { to: '/signup', label: 'Sign Up', icon: UserPlus }
                        ]
                        : [])
                ].map(({ to, label, icon: Icon }) => (
                    <Link
                        key={to}
                        to={to}
                        onClick={() => mobile && setIsMenuOpen(false)}
                        className={linkStyle}
                    >
                        <Icon className={iconStyle} />
                        <span>{label}</span>
                    </Link>
                ))}

                {userDetail && (
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className={`${linkStyle} text-red-500 hover:text-red-700`}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
                        <span>Logout</span>
                    </button>
                )}
            </motion.div>
        );
    };

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-xl shadow-lg fixed top-0 left-0 right-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold  text-blue-600  hover:scale-105 transition-transform"
                    >
                        VRV
                    </Link>

                    <div className="hidden md:flex space-x-2 items-center">
                        <NavLinks />
                    </div>

                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 hover:text-blue-600 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center min-h-screen"
                    >
                        <NavLinks mobile={true} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;