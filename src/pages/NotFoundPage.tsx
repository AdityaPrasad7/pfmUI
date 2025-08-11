import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const redirectByRole = () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/'); // No user -> login
        return;
      }

      const { role } = JSON.parse(userData);

      switch (role) {
        case 'store':
          navigate('/store');
          break;
        case 'manager':
          navigate('/manager-dashboard');
          break;
        case 'super-admin':
          navigate('/super-admin');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Error reading user role:', error);
      navigate('/');
    }
  };

  // Auto redirect on page load
  useEffect(() => {
    redirectByRole();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
      <button
        onClick={redirectByRole}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
}
