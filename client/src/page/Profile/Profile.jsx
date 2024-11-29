import { useEffect, useState } from 'react';
import { User, Mail, ShieldCheck, Copy, CheckCircle } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState(null);



    useEffect(() => {
        const storedUserDetail = localStorage.getItem('userDetail');
        if (storedUserDetail) {
            setUserDetail(JSON.parse(storedUserDetail));
        } else {
            navigate('/login');
        }
    }, [navigate]);
    const [copied, setCopied] = useState(false);

    const handleCopyId = () => {
        if (userDetail && userDetail.id) {
            navigator.clipboard.writeText(userDetail.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!userDetail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Please log in to view your profile</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-600 h-20 relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="bg-white p-1 rounded-full">
                            <User
                                className="text-blue-600"
                                size={64}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-16 p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {userDetail.name}
                    </h2>

                    <div className="space-y-4 mt-6">
                        <div className="flex items-center justify-center space-x-2 text-gray-700">
                            <Mail size={20} className="text-blue-500" />
                            <span>{userDetail.email}</span>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-gray-700">
                            <ShieldCheck size={20} className="text-green-500" />
                            <span className="capitalize">
                                {userDetail.role} Account
                            </span>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-gray-700">
                            <div className="flex items-center space-x-2">
                                <span>User ID:</span>
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                    {userDetail.id}
                                </code>
                                <button
                                    onClick={handleCopyId}
                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                    title="Copy User ID"
                                >
                                    {copied ? (
                                        <CheckCircle size={18} className="text-green-500" />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center space-x-4">

                        {userDetail.role === 'admin' && (
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                Admin Dashboard
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;