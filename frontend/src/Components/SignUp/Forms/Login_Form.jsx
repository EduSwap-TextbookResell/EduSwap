import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Typography, Button } from '@mui/material';
import axios from 'axios';

export default function Login_Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        console.log('Login response:', response.data);
        
        
        const user = response.data;
        localStorage.setItem('loggedUser', JSON.stringify(user));

        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      {/* Header */}
      <div className="mb-12 text-3xl font-bold text-center">
        Witamy w 
        <span className="text-dark_coral"> E</span>du
        <span className="text-dark_coral">S</span>wap!
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-8 max-w-md space-y-8">
        {/* Email Field */}
        <TextField
          label="Email"
          error={!!errors.email}
          variant="outlined"
          fullWidth
          size="small"
          {...register('email')}
        />
        {errors.email && (
          <Typography color="error" className="text-sm">
            {errors.email.message}
          </Typography>
        )}

        {/* Password Field */}
        <TextField
          label="Hasło"
          error={!!errors.password}
          variant="outlined"
          type="password"
          fullWidth
          size="small"
          {...register('password')}
        />
        {errors.password && (
          <Typography color="error" className="text-sm">
            {errors.password.message}
          </Typography>
        )}

        {/* Signup Link */}
        <div className="text-center text-sm mt-4">
          Nie masz konta?{' '}
          <Link to="/signup/register" className="text-dark_coral hover:underline hover:underline-offset-2 hover:decoration-light-coral">
            Zarejestruj się
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: '#E85A4F', padding: '12px' }}
        >
          Zaloguj się
        </Button>
      </form>
    </div>
  );
}
