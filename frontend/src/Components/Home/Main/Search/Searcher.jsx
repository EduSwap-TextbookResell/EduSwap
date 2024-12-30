import { Button, Box } from "@mui/material";
import { useState } from "react";
import Search_Icon from '../../../../assets/Main/search.svg';
import Form_Creator from "../Form_Creator";
export default function Searcher() {
  const [school_class, setClass] = useState("");
  const [subject, setSubject] = useState("");
  const [range_school, setRange_school] = useState("");
  const [type_school, setType_school] = useState("");
  const [filter_prize, setFilter] = useState("");

  const options = [
    {
      label: "Klasa",
      value: school_class,
      onChange: (e) => setClass(e.target.value),
      items: [
        { value: "klasa1", label: "Klasa 1" },
        { value: "klasa2", label: "Klasa 2" },
        { value: "klasa3", label: "Klasa 3" },
      ],
    },
    {
      label: "Przedmiot",
      value: subject,
      onChange: (e) => setSubject(e.target.value),
      items: [
        { value: "subj1", label: "Matematyka" },
        { value: "subj2", label: "Fizyka" },
        { value: "subj3", label: "Angielski" },
      ],
    },
    {
      label: "Zakres",
      value: range_school,
      onChange: (e) => setRange_school(e.target.value),
      items: [
        { value: "basic", label: "Podstawowy" },
        { value: "extended", label: "Rozszerzony" },
      ],
    },
    {
      label: "Typ książki",
      value: type_school,
      onChange: (e) => setType_school(e.target.value),
      items: [
        { value: "coursebook", label: "Podręcznik" },
        { value: "workbook", label: "Ćwiczenia" },
        { value: "other", label: "Inne" },
      ],
    },
    {
      label: "Filtruj ceny",
      value: filter_prize,
      onChange: (e) => setFilter(e.target.value),
      items: [
        { value: "fromsmallest", label: "Od najniższej ceny" },
        { value: "fromhighest", label: "Od najwyższej ceny" },
      ],
    },
  ];
  return (
    <div>
    <Box display="flex" alignItems="center" className="ml-10" gap={2}>
      
      <Form_Creator options={options}/>
      <Button 
        variant="contained" 
        fullWidth 
        /* tried doing here tailwind but didnt work so used sx which is well working*/
        sx={{ 
          backgroundColor: "#E85A4F", 
          height: 'fit-content', 
          mr: 5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
      <img 
        src={Search_Icon} 
        alt="Search Icon" 
        /* same here */
        style={{ 
          marginRight: 8, 
          height: '2em',
          filter: 'brightness(0) invert(1)'
        }} 
      />
      Wyszukaj
    </Button>
    </Box>
    <hr className="mt-7 border-light_gray" />
    </div>
  );
}
