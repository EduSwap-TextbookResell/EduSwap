import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function RegistrationForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [school, setSchool] = React.useState('');

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSchool(value);
    setValue('school', value);
  };

  return (
    <div>
      <p className="mb-9 ml-24 flex text-center">
        Witamy w <p className="ml-2 text-dark_coral">E</p>du
        <p className="text-dark_coral">S</p>wap!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="m-1">
          <TextField
            label="Mail"
            required
            variant="outlined"
            sx={{ width: '40ch' }}
            size="small"
            {...register('email', {
              required: 'Mail jest wymagany',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Niepoprawny adres mailowy',
              },
            })}
          />
        </p>
        <br />
        <p className="m-1">
          <TextField
            label="Nick"
            required
            variant="outlined"
            sx={{ width: '40ch' }}
            size="small"
            {...register('nick', {
              required: 'Nick jest wymagany',
              pattern: {
                value: /^[A-Za-z0-9_]+$/i,
                message:
                  'Nick może posiadać tylko literki, cyferki oraz podłogi',
              },
            })}
          />
        </p>
        <br />
        <p className="m-1">
          <TextField
            label="Miasto"
            required
            variant="outlined"
            sx={{ width: '40ch' }}
            size="small"
            {...register('city', {
              required: 'Miasto jest wymagane',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Miasto składa się tylko z literek',
              },
            })}
          />
        </p>
        <br />
        <p className="m-1 mt-[-1%]">
          <Box sx={{ Width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Wybierz szkołę</InputLabel>
              <Select
                labelId="select-label"
                required
                id="simple-select"
                value={school}
                label="Szkola"
                onChange={handleChange}
                sx={{
                  width: '39ch',
                  top: '-5px',
                  transform: 'translate(0, 12px) scale(1)',
                }}
                size="small"
              >
                <MenuItem value={'szkola1'}>
                  Szczecińskie Collegium Depresji
                </MenuItem>
                <MenuItem value={'szkola2'}>
                  Technikum Może Elektryczne
                </MenuItem>
                <MenuItem value={'szkola3'}>Chmurka Zgfburka</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </p>
        <br />
        <p className="m-1">
          <TextField
            label="Haslo"
            required
            variant="outlined"
            type="password"
            sx={{ width: '40ch' }}
            size="small"
            {...register('password', {
              required: 'Hasło jest wymagane',
              minLength: {
                value: 6,
                message: 'Hasło musi posiadać min. 6 znaków',
              },
            })}
          />
        </p>
        <br />
        <p className="m-1">
          <TextField
            label="Powtorz haslo"
            required
            variant="outlined"
            type="password"
            sx={{ width: '40ch' }}
            size="small"
            {...register('confirmPassword', {
              required: 'Powtórzenie hasła jest wymagane',
              validate: (value, data) =>
                value === data.password || 'Hasła się nie zgadzają',
            })}
          />
        </p>
        <br />
        <p className="mb-6 text-center">
          Masz już konto?{' '}
          <Link to="/signup/login" className="text-dark_coral">
            {' '}
            Zaloguj się
          </Link>
        </p>
        <p className="ml-5 mt-2">
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#E85A4F', width: '39ch' }}
          >
            Zarejestruj się
          </Button>
        </p>
      </form>
    </div>
  );
}
