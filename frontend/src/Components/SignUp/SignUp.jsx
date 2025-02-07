import { useParams, Link } from "react-router-dom";
import Registration_Form from "./Forms/Registration_Form.jsx";
import Login_Form from "./Forms/Login_Form.jsx";
import background_img from "../../assets/Main/background.png";
import Info_panel from "./Addons/Info_panel.jsx";

export default function SignUp() {
	const { action } = useParams();
	const isLogin = action === "login"; // Determines whether to show the login or registration form
	console.log(action);
	return (
		<div
			className="flex h-screen items-center justify-center bg-light_background bg-blend-darken"
			style={{ backgroundImage: `url(${background_img})` }}
		>
			<Link
				to="/"
				className="absolute left-4 top-4 bg-light_very_gray p-2 rounded-full active:bg-light_gray transition duration-300 ease-in-out hover:shadow-[0_0_15px_5px] hover:shadow-light_coral"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-6 h-6 text-white transition duration-300 ease-in-out hover:text-light_coral"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
			</Link>

			<div className="login_main_area flex flex-col lg:flex-row max-h-[90vh] sm:w-[65vw] w-[90vw] max-w-[1200px] rounded-3xl bg-light_very_gray overflow-hidden">
				{/* Main Form Area */}
				<div className="flex-1 flex justify-center overflow-y-auto">{isLogin ? <Login_Form /> : <Registration_Form />}</div>

				{/* Info Panel: Hidden on small screens */}
				<div className="hidden lg:flex flex-1 items-center justify-end pr-4 overflow-hidden py-4">
					<Info_panel />
				</div>
			</div>
		</div>
	);
}
