import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TextField, Typography, Button } from '@mui/material';

export default function Login_Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          label="Username"
          error={!!errors.nick}
          variant="outlined"
          fullWidth
          size="small"
          {...register('username', {
            required: 'Username jest wymagany',
            pattern: {
              value: /^[A-Za-z0-9_]+$/i,
              message: 'Username może posiadać tylko literki, cyferki oraz podłogi',
            },
          })}
        />
        {errors.nick && (
          <Typography color="error" className="text-sm">
            {errors.nick.message}
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
          {...register('password', {
            required: 'Hasło jest wymagane',
            minLength: {
              value: 6,
              message: 'Hasło musi posiadać min. 6 znaków',
            },
          })}
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