import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    User,
    ArrowRight,
    Search,
    Trash2,

} from "lucide-react";
import { AuthContext } from "../../context/auth.context";

const PostSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
            </div>
        </div>
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const { userDetail, isAuthenticated } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://vrv-securityrbac-taskround.onrender.com/api/v1/user/allpost", {
                withCredentials: true
            });

            if (Array.isArray(res.data.posts)) {
                setPosts(res.data.posts);
            } else {
                setError("Failed to fetch posts: Data is not an array");
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch posts");
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`https://vrv-securityrbac-taskround.onrender.com/api/v1/admin/deletepost?postId=${postId}`, {
                withCredentials: true
            });

            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-10">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Latest Posts
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Discover inspiring stories and insights from our community
                    </p>

                    <div className="mt-8 max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search
                                className="absolute left-3 top-3.5 text-gray-400"
                                size={20}
                            />
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <PostSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-xl text-gray-500">No posts found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
                            >
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.body}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-gray-500">
                                            <User size={16} />
                                            <span className="text-sm">
                                                {post.user.name || 'Anonymous'}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => navigate(`/post/${post._id}`)}
                                                className="flex items-center text-blue-600 hover:text-blue-800 transition group"
                                            >
                                                Read More
                                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={16} />
                                            </button>
                                            {isAuthenticated && userDetail?.role === 'admin' && (
                                                <button
                                                    onClick={() => handleDeletePost(post._id)}
                                                    className="text-red-500 hover:text-red-700 transition hover:scale-110"
                                                    title="Delete Post"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;