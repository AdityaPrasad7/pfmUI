import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Box, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import loginImg from '../../../assets/loginimg/loginPage.jpg';
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
     <div className=' w-[100vw] h-[100vh] absolute top-0 left-0 z-50 flex justify-center items-center'
      style={{
    backgroundImage: `url(${loginImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
     >
      <div className="bg-white/60 backdrop-blur-md h-[30rem] w-[35rem] rounded-xl shadow-lg">
  hello
</div>

     </div>

      
    </>
  );
};

export default SignIn;