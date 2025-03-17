import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginForm({ flipBookRef, isMobile }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm();

	const [globalError, setGlobalError] = useState(null);

	const onSubmit = (data) => {
		data.preventDefault();
		setGlobalError(null);
		axios
			.post("http://localhost:3000/api/auth/login", data)
			.then((res) => {
				console.log("Login success:", res.data);
				// Do something on success (redirect, etc.)
			})
			.catch((err) => {
				setGlobalError(err.response?.data?.message || "Wystąpił błąd!");
			});
	};

	// Combine any form errors + global errors
	const combinedErrors = [];
	if (globalError) combinedErrors.push(globalError);
	if (errors.email) combinedErrors.push(errors.email.message);
	if (errors.password) combinedErrors.push(errors.password.message);

	const handleFlipToRegister = () => {
		// If we're in the flipbook and not on mobile, flip to next page (Step 1)
		if (!isMobile && flipBookRef?.current) {
			flipBookRef.current.pageFlip().flipNext();
		}
	};

	return (
		<div className="w-full max-w-md p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Zaloguj się</h2>

			{/* Error Box */}
			{combinedErrors.length > 0 && (
				<div className="bg-red-200 border border-red-500 text-red-900 rounded p-4 mb-4">
					<ul className="list-disc pl-5">
						{combinedErrors.map((errMsg, i) => (
							<li key={i}>{errMsg}</li>
						))}
					</ul>
					<button
						onClick={() => {
							setGlobalError(null);
							clearErrors();
						}}
						className="text-sm text-right block mt-2 text-dark_coral"
					>
						Zamknij
					</button>
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Email */}
				<div>
					<label className="block mb-1 text-sm font-medium">Email</label>
					<input
						type="email"
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("email", { required: "Email jest wymagany" })}
					/>
				</div>
				{errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}

				{/* Password */}
				<div>
					<label className="block mb-1 text-sm font-medium">Hasło</label>
					<input
						type="password"
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("password", { required: "Hasło jest wymagane" })}
					/>
				</div>
				{errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

				{/* Submit */}
				<button type="submit" className="w-full bg-dark_coral text-white py-2 rounded hover:bg-light_coral transition-all">
					Zaloguj się
				</button>
			</form>

			{/* Switch to Registration */}
			{!isMobile && (
				<div className="text-center mt-4">
					Nie masz konta?{" "}
					<button type="button" onClick={handleFlipToRegister} className="text-dark_coral underline">
						Zarejestruj się
					</button>
				</div>
			)}
		</div>
	);
}
