import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationStepOne({
	flipBookRef,
	isMobile,
	nextStep, // for mobile
}) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: "onChange" }); // real-time validation

	const [globalError] = useState(null);

	const handleFlipToRegister = () => {
		// If we're in the flipbook and not on mobile, flip to next page (Step 1)
		if (!isMobile && flipBookRef?.current) {
			flipBookRef.current.pageFlip().flipPrev();
		}
	};

	const onSubmit = () => {
		// For mobile, just call nextStep
		// For desktop, flip the page
		if (isMobile) {
			if (nextStep) nextStep();
		} else if (flipBookRef?.current) {
			flipBookRef.current.pageFlip().flipNext();
		}
	};

	return (
		<div className="w-full max-w-md p-4">
			<h2 className="text-2xl font-bold mb-4 text-center text-amber-800">Rejestracja - Krok 1</h2>

			{globalError && <div className="bg-red-200 border border-red-500 text-red-900 rounded p-4 mb-4">{globalError}</div>}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Email */}
				<div>
					<label className="block mb-1 text-sm font-medium">Email</label>
					<input
						type="email"
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("email", {
							required: "Email jest wymagany",
							pattern: {
								value: /^[^@]+@[^@]+\.[^@]+$/,
								message: "Niepoprawny adres email",
							},
						})}
					/>
					{errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
				</div>

				{/* Password */}
				<div>
					<label className="block mb-1 text-sm font-medium">Hasło</label>
					<input
						type="password"
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("password", {
							required: "Hasło jest wymagane",
							minLength: {
								value: 6,
								message: "Hasło musi mieć minimum 6 znaków",
							},
						})}
					/>
					{errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
				</div>

				{/* Confirm Password */}
				<div>
					<label className="block mb-1 text-sm font-medium">Potwierdź Hasło</label>
					<input
						type="password"
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("confirmPassword", {
							required: "Potwierdzenie hasła jest wymagane",
							validate: (value) => value === watch("password") || "Hasła się nie zgadzają",
						})}
					/>
					{errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
				</div>

				<button type="submit" className="w-full bg-dark_coral text-white py-2 rounded hover:bg-light_coral transition-all">
					Dalej
				</button>

				{!isMobile && (
					<div className="text-center mt-4">
						Jednak masz konto? {" "} 
						<button type="button" onClick={handleFlipToRegister} className="text-dark_coral underline">
							Zaloguj się
						</button>
					</div>
				)}
			</form>
		</div>
	);
}
