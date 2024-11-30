/* eslint-disable react/prop-types */
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Loading from './components/Loading.jsx';
import Navbar from './components/Navbar';
import ProtectedRoute from './protecedRoute/ProtectedRoute';

const Login = lazy(() => import('./page/auth/Login'));
const Signup = lazy(() => import('./page/auth/Signup'));
const Home = lazy(() => import('./page/Home/Home'));
const Profile = lazy(() => import('./page/Profile/Profile'));
const AdminDashboard = lazy(() => import('./page/AdminDashboard/AdminDashboard'));
const CreatePost = lazy(() => import('./page/Post/CreatePost'));
const PostDetail = lazy(() => import('./page/Post/PostDetail'));
const CreateUser = lazy(() => import('./page/CreateUser/CreateUser'));


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <pre className="text-gray-700 mb-4 overflow-x-auto">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/login"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Login />
                </ErrorBoundary>
              }
            />
            <Route
              path="/signup"
              element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Signup />
                </ErrorBoundary>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Home />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Profile />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <AdminDashboard />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <CreatePost />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <PostDetail />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />

            <Route path='/create-user' element={
              <ProtectedRoute>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <CreateUser />
                </ErrorBoundary>
              </ProtectedRoute>
            } />

          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;