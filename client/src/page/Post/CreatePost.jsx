import { useState } from 'react';
import { PenLine, Send } from 'lucide-react';
import axios from 'axios';

const CreatePost = () => {
    axios
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://vrv-security-rbac-task-round.vercel.app/api/v1/user/createpost', { title, body }, {

                withCredentials: true
            });
            // console.log('Post created:', response.data);
            setSuccess(response.data.message);
            if (response.data.message === "ask admin to give you permission to post") {
                throw new Error('ask admin to give you permission to post');
            }
            setTitle('');
            setBody('');

        } catch (error) {

            console.log(error);
            setError(error.response?.data?.message || 'Post creation failed');
        }
    };

    return (
        <div className="min-h-screen  to-blue-100 flex justify-center items-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
                <div className="bg-blue-600 text-white p-6 flex items-center">
                    <PenLine className="mr-4 w-10 h-10" />
                    <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg animate-bounce">
                            <p className="font-medium">{success}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
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
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out resize-none"
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                        <Send className="w-5 h-5" />
                        <span>Publish Post</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;