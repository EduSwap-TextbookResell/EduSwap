import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function Login_Form() {
  const { register: login, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/', { state: { user: data } });
  };
  
  return (
    <div>
      <div className="ml-24 flex text-center">
        Witamy w <p className="ml-2 text-dark_coral">E</p>du
        <p className="text-dark_coral">S</p>wap!
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-1 mt-40">
          <TextField
            label="Nick"
            error={!!errors.nick}
            variant="outlined"
            sx={{ width: '40ch' }}
            size="small"
            {...login('nick', {
              required: 'Nick jest wymagany',
              pattern: {
                value: /^[A-Za-z0-9_]+$/i,
                message:
                  'Nick może posiadać tylko literki, cyferki oraz podłogi',
              },
            })}
          />
        </div>
        {errors.nick && <Typography color='error' style={{ position: 'absolute'}}>{errors.nick.message}</Typography>}
        <br />
        <div className="m-1 mt-4">
          <TextField
            label="Haslo"
            error={!!errors.password}
            variant="outlined"
            type="password"
            sx={{ width: '40ch' }}
            size="small"
            {...login('password', {
              required: 'Hasło jest wymagane',
              minLength: {
                value: 6,
                message: 'Hasło musi posiadać min. 6 znaków',
              },
            })}
          />
        </div>
        {errors.password && <Typography color='error' style={{ position: 'absolute'}}>{errors.password.message}</Typography>}
        <br />
        <div className="mb-6 mt-32 text-center">
          Nie masz konta?{' '}
          <Link to="/signup/register" className="text-dark_coral">
            {' '}
            Zarejestruj się
          </Link>
        </div>
        <div className="ml-5 mt-6">
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#E85A4F', width: '39ch' }}
          >
            Zaloguj się
          </Button>
        </div>
      </form>
    </div>
  );
}
