import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
export default function Login_Form() {
  const { register:login, handleSubmit} = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <p className="text-center  flex ml-24">
        Witamy w <p className="text-dark_coral ml-2">E</p>du
        <p className="text-dark_coral">S</p>wap!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="m-1 mt-40">
          <TextField
            label="Nick"
            required
            variant="outlined"
            sx={{ width: "40ch" }}
            size="small"
            {...login("nick", {
              required: "Nick is required",
              pattern: {
                value: /^[A-Za-z0-9_]+$/i,
                message:
                  "Nick can only contain letters, numbers, and underscores",
              },
            })}
          />
        </p>
        <br />
        <p className="m-1 mt-4">
          <TextField
            label="Haslo"
            required
            variant="outlined"
            type="password"
            sx={{ width: "40ch" }}
            size="small"
            {...login("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
        </p>

        <br />
        <p className="text-center mb-6 mt-32">
          Nie masz konta?{" "}
          <Link to="/signup/register" className="text-dark_coral">
            {" "}
            Zarejestruj się
		</Link>
        </p>
        <p className="ml-5 mt-6">
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#E85A4F", width: "39ch" }}
          >
            Zaloguj się
          </Button>
        </p>
      </form>
    </div>
  );
}
