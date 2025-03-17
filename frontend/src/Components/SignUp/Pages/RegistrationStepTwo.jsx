import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationStepTwo({
	flipBookRef,
	isMobile,
	nextStep, // for mobile
	prevStep, // for mobile
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const [globalError,] = useState(null);

	const onSubmit = () => {
		if (isMobile) {
			if (nextStep) nextStep();
		} else if (flipBookRef?.current) {
			flipBookRef.current.pageFlip().flipNext();
		}
	};

	const handlePrev = () => {
		if (isMobile) {
			if (prevStep) prevStep();
		} else if (flipBookRef?.current) {
			flipBookRef.current.pageFlip().flipPrev();
		}
	};

	return (
		<div className="w-full max-w-md p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Rejestracja - Krok 2</h2>

			{globalError && <div className="bg-red-200 border border-red-500 text-red-900 rounded p-4 mb-4">{globalError}</div>}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Username */}
				<div>
					<label className="block mb-1 text-sm font-medium">Username</label>
					<input
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("username", {
							required: "Username jest wymagany",
							pattern: {
								value: /^[A-Za-z0-9_]+$/i,
								message: "Username może zawierać tylko litery, cyfry i podkreślniki",
							},
						})}
					/>
					{errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
				</div>

				<div className="flex justify-between">
					<button type="button" onClick={handlePrev} className="bg-gray text-white px-4 py-2 rounded hover:shadow">
						Wstecz
					</button>
					<button type="submit" className="bg-dark_coral text-white px-4 py-2 rounded hover:bg-light_coral transition-all">
						Dalej
					</button>
				</div>
			</form>
		</div>
	);
}
