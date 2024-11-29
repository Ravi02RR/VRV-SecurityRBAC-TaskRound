import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    ArrowLeft, 
    User, 
    Calendar, 
    Clock, 
    Edit, 
    Trash2 
} from "lucide-react";
import { AuthContext } from "../../context/auth.context";

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { userDetail, isAuthenticated } = useContext(AuthContext);
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/posts/${postId}`,);
            console.log(response.data.post);

            
            setPost(response.data.post);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch post details", err);
            setError("Failed to load post details");
            setLoading(false);
        }
    };

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/admin/deletepost?postId=${postId}`, {
                withCredentials: true
            });
            navigate('/'); 
        } catch (err) {
            console.error("Failed to delete post", err);
            
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [postId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 01-4.144-4.145l-.474-2.391a2 2 0 00-1.416-1.462l-1.454-.361a2 2 0 01-1.517-1.916l.02-1.455a2 2 0 00-1.15-1.86l-1.295-.654a2 2 0 01-1.12-1.836l.025-1.608a2 2 0 00-.956-1.764L4.9 6.601a2.002 2.002 0 00-.807 1.676l.038 1.258a2 2 0 01-1.3 1.88l-1.718.68a2 2 0 00-1.24 1.657l.07 1.677a2 2 0 001.065 1.722l1.574.838a2 2 0 011.117 1.667l.07 1.626a2 2 0 001.178 1.765l1.7.773a2 2 0 011.336 1.674l.065 1.59a2 2 0 001.247 1.794l1.56.78a2 2 0 002.08-.435l1.196-1.196a2 2 0 011.122-.538l2.394-.479a6 6 0 004.117-4.125l.46-2.363a2 2 0 011.478-1.533l1.69-.425a2 2 0 001.52-1.927V10a2 2 0 00-2-2 2 2 0 01-2-2V6a2 2 0 00-2-2" />
                        </svg>
                    </div>
                    <p className="mt-4 text-gray-600 text-lg">Loading post details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={fetchPostDetail}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-gray-600 hover:text-blue-600 transition flex items-center"
                        >
                            <ArrowLeft className="mr-2" /> Back to Posts
                        </button>
                        {isAuthenticated && userDetail?.role === 'admin' && (
                            <div className="flex space-x-4">
                                <button
                                    className="text-blue-500 hover:text-blue-700 transition"
                                    title="Edit Post"
                                    disabled
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Delete Post"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-6 text-gray-600 mb-6">
                        <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span>{post.user.name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>
                                {new Date(post.createdAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit', 
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="prose prose-lg text-gray-800 mb-8">
                        {post.body}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;