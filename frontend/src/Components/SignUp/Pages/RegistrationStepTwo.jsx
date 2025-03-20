import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
		watch,
	} = useForm({ mode: "onChange" });

	const [status, setStatus] = useState({ loading: false, error: null, available: false });
	const username = watch("username");

	// Debounced username check
	useEffect(() => {
		if (!username) {
			setStatus({ loading: false, error: null, available: false });
			return;
		}

		setStatus({ loading: true, error: null, available: false });

		const delayDebounceFn = setTimeout(async () => {
			try {
				const response = await axios.post("http://localhost:3000/api/auth/uniqueUser", { username });

				if (response.status === 200) {
					setStatus({ loading: false, error: null, available: true });
				}
			} catch (err) {
				setStatus({
					loading: false,
					error: err.response?.status === 409 ? "This username is already taken." : "An error occurred. Please try again.",
					available: false,
				});
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [username]);

	const onSubmit = () => {
		if (status.error || !status.available) return; // Prevent submission if username is invalid

		if (isMobile) {
			nextStep?.();
		} else {
			flipBookRef?.current?.pageFlip().flipNext();
		}
	};

	const handlePrev = () => {
		if (isMobile) {
			prevStep?.();
		} else {
			flipBookRef?.current?.pageFlip().flipPrev();
		}
	};

	return (
		<div className="w-full max-w-md p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Rejestracja - Krok 2</h2>

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

					{/* Reserved space to prevent layout shift */}
					<div className="h-6 mt-1">
						{errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
						{!errors.username && (
							<p className="text-sm mt-1">
								{status.loading ? (
									<span className="text-orange-400">Checking username...</span>
								) : status.error ? (
									<span className="text-red-600">{status.error}</span>
								) : status.available ? (
									<span className="text-green-600">Username is available!</span>
								) : null}
							</p>
						)}
					</div>
				</div>

				<div className="flex justify-between">
					<button type="button" onClick={handlePrev} className="bg-gray text-white px-4 py-2 rounded hover:shadow">
						Wstecz
					</button>
					<button
						type="submit"
						disabled={status.loading || status.error || !status.available}
						className={`px-4 py-2 rounded transition-all ${
							status.loading || status.error || !status.available
								? "bg-gray-400 cursor-not-allowed"
								: "bg-dark_coral text-white hover:bg-light_coral"
						}`}
					>
						Dalej
					</button>
				</div>
			</form>
		</div>
	);
}
