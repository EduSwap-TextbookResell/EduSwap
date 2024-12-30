import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
const Form_Creator  = ({ options }) => {
    return(
      <>
        {options.map((option, index) => (
            <FormControl key={index} fullWidth size="small" sx={{ mr: 2 }}>
              <InputLabel id={`${option.label}-label`} sx={{
          color: 'lightcoral',
          '&.Mui-focused': { color: 'lightcoral' },
        }}>{option.label}</InputLabel>
              <Select
                labelId={`${option.label}-label`}
                value={option.value}
                label={option.label}  
                onChange={option.onChange}
                className="shadow-lg blur-[0.5px]"
                sx={{
                  backgroundColor:'white',
                  borderRadius: '11px',
                  '& .MuiSelect-select': {
                    borderRadius: '11px',
                  },
                  ".MuiOutlinedInput-notchedOutline": { border: 2, borderColor: "lightcoral" },
                  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 2,borderColor: "lightcoral"
                    },
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 2,borderColor: "lightcoral"
                    },
                    '.MuiSelect-icon':{color:"lightcoral"}
                }}
              >
                {option.items.map((item, idx) => (
                  <MenuItem key={idx} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          </>
    )
}
export default Form_Creator;