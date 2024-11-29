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

const PostDetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-pulse">
            <div className="p-8">
                <div className="flex justify-between mb-8">
                    <div className="h-8 w-24 bg-gray-300 rounded"></div>
                    <div className="flex space-x-4">
                        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="h-12 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="flex space-x-6 mb-6">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

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
            const response = await axios.get(`http://localhost:3000/posts/${postId}`);
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

    if (loading) return <PostDetailSkeleton />;

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center  ">
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
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