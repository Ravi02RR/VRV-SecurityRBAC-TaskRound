import { useState, useRef, useEffect } from 'react';
import { PenLine, Send, Loader2, PartyPopper } from 'lucide-react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();   
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/createpost',
                { title, body },
                { withCredentials: true }
            );

            setSuccess(response.data.message);

            if (response.data.message === "ask admin to give you permission to post") {
                throw new Error('ask admin to give you permission to post');
            }

            setTitle('');
            setBody('');

        } catch (error) {
            setError(error.response?.data?.message || 'Post creation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex justify-center items-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-blue-600 text-white p-6 flex items-center">
                    <PenLine className="mr-4 w-10 h-10" />
                    <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
                </div>

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 flex items-center space-x-4 animate-fade-in">
                        <PartyPopper className="w-10 h-10 animate-bounce" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                            <p className="text-green-600">{success}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                            Post Title
                        </label>
                        <input
                            ref={inputRef}
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out disabled:opacity-50"
                            placeholder="Enter an engaging title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="body" className="block text-sm font-semibold text-gray-700">
                            Post Content
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            disabled={loading}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out resize-none disabled:opacity-50"
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" size={20} />
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Publish Post</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;