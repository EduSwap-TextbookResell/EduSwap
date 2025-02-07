import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
	TextField,
	Typography,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";
import axios from "axios";

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
		const { confirmPassword, ...rest } = data;
		axios.post("http://localhost:3000/api/auth/register", rest).then((response) => {
			console.log(response);
		});
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
		<div className="flex flex-col items-center justify-center h-full p-8">
			{/* Header */}
			<div className="mb-8 text-2xl font-bold text-center">
				Witamy w<span className="text-dark_coral"> E</span>du
				<span className="text-dark_coral">S</span>wap!
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
				{/* Email Field */}
				<TextField
					label="Email"
					error={!!errors.email}
					variant="outlined"
					fullWidth
					size="small"
					helperText={errors.email ? errors.email.message : "Wprowadź prawidłowy adres email"}
					{...register("email", {
						required: "Mail jest wymagany",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Niepoprawny adres mailowy",
						},
					})}
				/>

				{/* Username Field */}
				<TextField
					label="Username"
					error={!!errors.username}
					variant="outlined"
					fullWidth
					size="small"
					helperText={
						errors.username
							? errors.username.message
							: "Używaj liter, cyfr i podkreślników (np. user_123)"
					}
					{...register("username", {
						required: "Username jest wymagany",
						pattern: {
							value: /^[A-Za-z0-9_]+$/i,
							message: "Username może posiadać tylko literki, cyferki oraz podłogi",
						},
					})}
				/>

				{/* City Selection */}
				<FormControl fullWidth size="small" error={!!errors.city}>
					<InputLabel id="city-label">Wybierz miasto</InputLabel>
					<Select
						labelId="city-label"
						value={city}
						label="Miasto"
						onChange={change_city}
						{...register("city", { required: "Wybranie miasta jest wymagane" })}
					>
						<MenuItem value="city1">Szczecin</MenuItem>
						<MenuItem value="city2">Warszawa</MenuItem>
						<MenuItem value="city3">Kraków</MenuItem>
					</Select>
					<Typography color="error">{errors.city?.message}</Typography>
				</FormControl>

				{/* School Selection */}
				<FormControl fullWidth size="small" error={!!errors.school}>
					<InputLabel id="school-label">Wybierz szkołę</InputLabel>
					<Select
						labelId="school-label"
						disabled={!city}
						value={school}
						label="Szkola"
						onChange={change_school}
						{...register("school", { required: "Wybranie szkoly jest wymagane" })}
					>
						<MenuItem value="szkola1">Szczecińskie Collegium Depresji</MenuItem>
						<MenuItem value="szkola2">Technikum Może Elektryczne</MenuItem>
						<MenuItem value="szkola3">Chmurka Zgfburka</MenuItem>
					</Select>
					<Typography color="error">{errors.school?.message}</Typography>
				</FormControl>

				{/* Password Field */}
				<TextField
					label="Hasło"
					error={!!errors.password}
					variant="outlined"
					type="password"
					fullWidth
					size="small"
					helperText={
						errors.password
							? errors.password.message
							: "Hasło musi mieć min. 6 znaków"
					}
					{...register("password", {
						required: "Hasło jest wymagane",
						minLength: { value: 6, message: "Hasło musi posiadać min. 6 znaków" },
					})}
				/>

				{/* Confirm Password Field */}
				<TextField
					label="Powtorz haslo"
					error={!!errors.confirmPassword}
					variant="outlined"
					type="password"
					fullWidth
					size="small"
					helperText={
						errors.confirmPassword
							? errors.confirmPassword.message
							: "Powtórz swoje hasło, aby kontynuować"
					}
					{...register("confirmPassword", {
						required: "Powtórzenie hasła jest wymagane",
						validate: (value) => value === watch("password") || "Hasła się nie zgadzają",
					})}
				/>

				{/* Login Link */}
				<div className="text-center text-sm">
					Masz już konto?{" "}
					<Link
						to="/signup/login"
						className="text-dark_coral hover:underline hover:underline-offset-2 hover:decoration-light-coral"
					>
						Zaloguj się
					</Link>
				</div>

				{/* Submit Button */}
				<Button
					variant="contained"
					type="submit"
					fullWidth
					sx={{ backgroundColor: "#E85A4F", padding: "12px" }}
				>
					Zarejestruj się
				</Button>
			</form>
		</div>
	);
}