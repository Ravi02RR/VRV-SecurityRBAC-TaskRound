
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2
          className="mx-auto h-12 w-12 text-blue-500 animate-spin"
        />
        <p className="mt-4 text-gray-600 text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;