import { useState } from 'react';
import { Input, Button } from '@mui/material';
import Form_Creator from '../Form_Creator';
export default function Seller() {
  const [school_class, setClass] = useState('');
  const [subject, setSubject] = useState('');
  const [range_school, setRange_school] = useState('');
  const [type_school, setType_school] = useState('');
  const [details, setDetails] = useState('');

  const options = [
    {
      label: 'Klasa',
      value: school_class,
      onChange: (e) => setClass(e.target.value),
      items: [
        { value: 'klasa1', label: 'Klasa 1' },
        { value: 'klasa2', label: 'Klasa 2' },
        { value: 'klasa3', label: 'Klasa 3' },
      ],
    },
    {
      label: 'Przedmiot',
      value: subject,
      onChange: (e) => setSubject(e.target.value),
      items: [
        { value: 'subj1', label: 'Matematyka' },
        { value: 'subj2', label: 'Fizyka' },
        { value: 'subj3', label: 'Angielski' },
      ],
    },
    {
      label: 'Zakres',
      value: range_school,
      onChange: (e) => setRange_school(e.target.value),
      items: [
        { value: 'basic', label: 'Podstawowy' },
        { value: 'extended', label: 'Rozszerzony' },
      ],
    },
    {
      label: 'Typ książki',
      value: type_school,
      onChange: (e) => setType_school(e.target.value),
      items: [
        { value: 'coursebook', label: 'Podręcznik' },
        { value: 'workbook', label: 'Ćwiczenia' },
        { value: 'other', label: 'Inne' },
      ],
    },
  ];
  return (
    <div className="h-[73vh] w-full">
      <div className="m-auto h-[65%]">
        <div className="m-auto mb-5 flex h-[90%] w-[75%] rounded-3xl bg-light_background shadow-lg">
          <div className="ml-6 mt-10 flex h-[75%] w-[35%] items-center justify-center rounded-3xl bg-light_coral shadow-xl">
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className="absolute h-[1.5vh] w-[2.5vw] rotate-90 rounded-3xl bg-dark_coral shadow-inner"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)' }}
              ></div>
              <div
                className="absolute h-[1.5vh] w-[2.5vw] rounded-3xl bg-dark_coral shadow-inner"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)' }}
              ></div>
            </div>
          </div>
          <div className="h-[100%] w-[100%]">
            <div className="m-10 flex h-fit w-[75%]">
              <Form_Creator options={options} />
            </div>
            <div className="ml-6">
              <div className="ml-[2%]">
                <Input
                  type="number"
                  className="w-[6vw]"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '11px',
                    '&:before': {
                      borderBottom: 'none',
                    },
                    '&:after': {
                      borderBottom: 'none',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottom: 'none',
                    },
                    '&.Mui-focused:before': {
                      borderBottom: 'none',
                    },
                    '&.Mui-focused:after': {
                      borderBottom: 'none',
                    },
                  }}
                ></Input>
              </div>
              <br></br>
              <div className="ml-[2%]">
                <Input
                  type="text"
                  multiline
                  minRows={3}
                  maxRows={5}
                  className="w-[40%] mb-2"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '11px',
                    '&:before': {
                      borderBottom: 'none',
                    },
                    '&:after': {
                      borderBottom: 'none',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottom: 'none',
                    },
                    '&.Mui-focused:before': {
                      borderBottom: 'none',
                    },
                    '&.Mui-focused:after': {
                      borderBottom: 'none',
                    },
                  }}
                ></Input>
              </div>
              <br></br>
              <div className="ml-[55%] mt-[-10%] w-[10vw]">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#E85A4F',
                    height: 'fit-content',
                    mr: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Dodaj
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: '#E9E9E9', borderWidth: '2px' }} />
      </div>
      <div className="mt-3 text-center text-xl text-light_coral">
        Moje wystawione książki
      </div>
    </div>
  );
}
