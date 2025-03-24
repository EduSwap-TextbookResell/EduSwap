import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function RegistrationStepThree({ flipBookRef, isMobile, prevStep }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const [globalError, setGlobalError] = useState(null);
	const [globalSuccess, setGlobalSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setGlobalError(null);
		setGlobalSuccess(null);
		setLoading(true);

		try {
			const response = await axios.post("http://localhost:3000/api/auth/register", data);
			setGlobalSuccess("Rejestracja przebiegła pomyślnie!");
			console.log(response.data);
		} catch (error) {
			setGlobalError(error.response?.data?.message || "Wystąpił błąd!");
		}
		setLoading(false);
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
			<h2 className="text-2xl font-bold mb-4 text-center">Rejestracja - Krok 3</h2>

			{/* Error Box */}
			{globalError && <div className="bg-red-200 border border-red-500 text-red-900 rounded p-4 mb-4">{globalError}</div>}

			{/* Success Box */}
			{globalSuccess && <div className="bg-green-200 border border-green-500 text-green-900 rounded p-4 mb-4">{globalSuccess}</div>}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* City */}
				<div>
					<label className="block mb-1 text-sm font-medium">Miasto</label>
					<select
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("city", { required: "Wybór miasta jest wymagany" })}
					>
						<option value="">-- Wybierz miasto --</option>
						<option value="Szczecin">Szczecin</option>
						<option value="Warszawa">Warszawa</option>
						<option value="Kraków">Kraków</option>
					</select>
					{errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
				</div>

				{/* School */}
				<div>
					<label className="block mb-1 text-sm font-medium">Szkoła</label>
					<select
						className="w-full border border-gray-300 rounded px-3 py-2"
						{...register("school", { required: "Wybór szkoły jest wymagany" })}
					>
						<option value="">-- Wybierz szkołę --</option>
						<option value="Szczecińskie Collegium Depresji">Szczecińskie Collegium Depresji</option>
						<option value="Technikum Może Elektryczne">Technikum Może Elektryczne</option>
						<option value="Chmurka Zgfburka">Chmurka Zgfburka</option>
					</select>
					{errors.school && <p className="text-red-600 text-sm mt-1">{errors.school.message}</p>}
				</div>

				<div className="flex justify-between">
					<button type="button" onClick={handlePrev} className="bg-gray text-white px-4 py-2 rounded hover:shadow">
						Wstecz
					</button>

					<button
						type="submit"
						disabled={loading}
						className="bg-dark_coral text-white px-4 py-2 rounded hover:bg-light_coral transition-all"
					>
						{loading ? "Rejestrowanie..." : "Zakończ Rejestrację"}
					</button>
				</div>
			</form>
		</div>
	);
}
