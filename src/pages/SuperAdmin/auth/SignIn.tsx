import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Box, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reset body margins/padding for full-screen background
const GlobalStyles = styled('div')({
  body: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    zIndex:"50px"
  },
});

interface FormInputs {
  email: string;
  password: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '400px',
  margin: 'auto',
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: theme.shadows[5],
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
  backdropFilter: 'blur(8px)', // Optional blur for modern effect
}));

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { email, password } = data;

    if (email !== 'admin@gmail.com' || password !== 'admin@1234') {
      toast.error('Invalid email or password', {
        toastId: 'login-error',
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify({ role: 'super-admin' }));

    console.log('Login successful:', { email, role: 'super-admin' });

    toast.success('Super Admin login successful!', {
      toastId: 'login-success',
      position: 'top-right',
      autoClose: 2000,
      onClose: () => navigate('/dashboard'),
    });
  };

  return (
    <>
      <div className='w-[100vw] h-[100vh] absolute top-0 left-0 z-50 flex justify-center items-center relative overflow-hidden'>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}src/assets/login-image/login.jpg)`,
            filter: 'brightness(0.6) contrast(1.1)'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Content Container */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transition-all duration-300 relative z-10 border border-white/30">
          {/* Header */}
          <div className="py-8 px-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold tracking-tight text-white">Super Admin</h1>
              <p className="text-sm text-white/90 mt-2 font-medium">System Administration Portal</p>
            </div>
          </div>

          <div className="p-8">
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Admin Email
                </label>
                <div className="relative group">
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-10 bg-white/40 backdrop-blur-sm group-hover:bg-white/50 group-hover:border-white/50"
                    placeholder="admin@gmail.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-600 group-focus-within:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Admin Password
                </label>
                <div className="relative group">
                  <input
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type="password"
                    className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-10 bg-white/40 backdrop-blur-sm group-hover:bg-white/50 group-hover:border-white/50"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-600 group-focus-within:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                } flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Super Admin Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 border-t border-white/30 pt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800">Super Admin Credentials</h4>
              </div>
              <div className="bg-indigo-500/20 backdrop-blur-sm p-4 rounded-xl border border-indigo-300/30">
                <div className="text-xs text-gray-800 space-y-2">
                  <div className="flex items-start">
                    <span className="inline-block bg-indigo-500/30 text-indigo-900 text-xs px-2 py-1 rounded-lg mr-2 font-medium">Super Admin</span>
                    <div>
                      <div className="font-medium">admin@gmail.com</div>
                      <div className="text-gray-700">admin@1234</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default SignIn;