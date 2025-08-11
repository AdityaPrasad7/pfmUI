import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectByRole = () => {
    try {
      let role = null;
      const pathname = location.pathname.toLowerCase();

      // Determine likely role from URL
      if (pathname.startsWith('/super-admin')) {
        role = 'super-admin';
      } else if (pathname.startsWith('/delivery-partner') || pathname.startsWith('/store')) {
        role = 'store';
      } else if (pathname.startsWith('/manager')) {
        role = 'manager';
      }

      // Validate role with localStorage
      const superAdminUser = localStorage.getItem('superAdminUser');
      const storeStaff = localStorage.getItem('storeStaff');
      const managerUser = localStorage.getItem('managerUser');

      if (superAdminUser && (!role || role === 'super-admin')) {
        try {
          const parsed = JSON.parse(superAdminUser);
          role = parsed.role || 'super-admin';
        } catch (e) {
          console.error('Error parsing superAdminUser:', e);
        }
      }

      if (storeStaff && (!role || role === 'store')) {
        role = 'store';
      }

      if (managerUser && (!role || role === 'manager')) {
        try {
          const parsed = JSON.parse(managerUser);
          role = parsed.role || 'manager';
        } catch (e) {
          console.error('Error parsing managerUser:', e);
        }
      }

      // Redirect based on detected role
      switch (role) {
        case 'store':
          navigate('/store/live-orders');
          toast.info('Redirecting to store dashboard.');
          break;
        case 'manager':
          navigate('/manager-dashboard');
          toast.info('Redirecting to manager dashboard.');
          break;
        case 'super-admin':
          navigate('/super-admin');
          toast.info('Redirecting to super admin dashboard.');
          break;
        default:
          navigate('/');
          toast.info('Redirecting to login page.');
          break;
      }
    } catch (error) {
      console.error('Error redirecting:', error);
      toast.error('Failed to redirect. Returning to login page.');
      navigate('/');
    }
  };

  useEffect(() => {
    redirectByRole();
  }, []);

  return (
    <>
      <ToastContainer />
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
    </>
  );
}