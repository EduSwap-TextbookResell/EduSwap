import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		formState: { errors },
	} = useForm();
	const city = watch("city", "");
	const school = watch("school", "");

	const onSubmit = (data) => {
		// eslint-disable-next-line no-unused-vars
		const { confirmPassword, ...formData } = data;
		console.log(formData);
	};

	const change_city = (event) => {
		const value = event.target.value;
		setValue("city", value);
		trigger("city");
	};

	const change_school = (event) => {
		const value = event.target.value;
		setValue("school", value);
		trigger("school");
	};

	return (
		<div>
			<div className="mb-9 ml-24 flex text-center">
				Witamy w <p className="ml-2 text-dark_coral">E</p>du
				<p className="text-dark_coral">S</p>wap!
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="m-1">
					<TextField
						label="Mail"
						error={!!errors.email}
						variant="outlined"
						sx={{ width: "40ch" }}
						size="small"
						{...register("email", {
							required: "Mail jest wymagany",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Niepoprawny adres mailowy",
							},
						})}
					/>
					{errors.email && <Typography color="error">{errors.email.message}</Typography>}
				</div>
				<br />
				<div className="m-1">
					<TextField
						label="Username"
						error={!!errors.nick}
						variant="outlined"
						sx={{ width: "40ch" }}
						size="small"
						{...register("username", {
							required: "Username jest wymagany",
							pattern: {
								value: /^[A-Za-z0-9_]+$/i,
								message: "Username może posiadać tylko literki, cyferki oraz podłogi",
							},
						})}
					/>
					{errors.nick && <Typography color="error">{errors.nick.message}</Typography>}
				</div>
				<br />
				<div className="m-1 mb-2 mt-[-1%]">
					<Box sx={{ Width: 300 }}>
						<FormControl fullWidth>
							<InputLabel id="select-label">Wybierz miasto</InputLabel>
							<Select
								labelId="select-label"
								error={!!errors.city}
								id="simple-select"
								value={city}
								label="Miasto"
								onChange={change_city}
								sx={{
									width: "39ch",
									top: "-5px",
									transform: "translate(0, 12px) scale(1)",
								}}
								{...register("city", {
									required: "Wybranie miasta jest wymagane",
								})}
								size="small"
							>
								<MenuItem value={"city1"}>Szczecin</MenuItem>
								<MenuItem value={"city2"}>Warszawa</MenuItem>
								<MenuItem value={"city3"}>Kraków</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
				{errors.city && <Typography color="error">{errors.city.message}</Typography>}
				<br />
				<div className="m-1 mb-2 mt-[-1%]">
					<Box sx={{ Width: 300 }}>
						<FormControl fullWidth>
							<InputLabel id="select-label">Wybierz szkołę</InputLabel>
							<Select
								labelId="select-label"
								disabled={!city}
								error={!!errors.school}
								id="simple-select"
								value={school}
								label="Szkola"
								onChange={change_school}
								sx={{
									width: "39ch",
									top: "-5px",
									transform: "translate(0, 12px) scale(1)",
								}}
								{...register("school", {
									required: "Wybranie szkoly jest wymagane",
								})}
								size="small"
							>
								<MenuItem value={"szkola1"}>Szczecińskie Collegium Depresji</MenuItem>
								<MenuItem value={"szkola2"}>Technikum Może Elektryczne</MenuItem>
								<MenuItem value={"szkola3"}>Chmurka Zgfburka</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
				{errors.school && <Typography color="error">{errors.school.message}</Typography>}
				<br />
				<div className="m-1">
					<TextField
						label="Haslo"
						error={!!errors.password}
						variant="outlined"
						type="password"
						sx={{ width: "40ch" }}
						size="small"
						{...register("password", {
							required: "Hasło jest wymagane",
							minLength: {
								value: 6,
								message: "Hasło musi posiadać min. 6 znaków",
							},
						})}
					/>
					{errors.password && <Typography color="error">{errors.password.message}</Typography>}
				</div>
				<br />
				<div className="m-1">
					<TextField
						label="Powtorz haslo"
						error={!!errors.confirmPassword}
						variant="outlined"
						type="password"
						sx={{ width: "40ch" }}
						size="small"
						{...register("confirmPassword", {
							required: "Powtórzenie hasła jest wymagane",
							validate: (value, data) => value === data.password || "Hasła się nie zgadzają",
						})}
					/>
					{errors.confirmPassword && <Typography color="error">{errors.confirmPassword.message}</Typography>}
				</div>
				<br />
				<div className="mb-6 text-center">
					Masz już konto?{" "}
					<Link to="/signup/login" className="text-dark_coral">
						{" "}
						Zaloguj się
					</Link>
				</div>
				<div className="ml-5 mt-2">
					<Button variant="contained" type="submit" sx={{ backgroundColor: "#E85A4F", width: "39ch" }}>
						Zarejestruj się
					</Button>
				</div>
			</form>
		</div>
	);
}
