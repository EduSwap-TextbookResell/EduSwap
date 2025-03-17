import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from "react-responsive";
import InfoPanel from "./InfoPanel.jsx";

// Pages
import LoginForm from "./Pages/LoginForm.jsx";
import RegistrationStepOne from "./Pages/RegistrationStepOne.jsx";
import RegistrationStepTwo from "./Pages/RegistrationStepTwo.jsx";
import RegistrationStepThree from "./Pages/RegistrationStepThree.jsx";

// Background image
import background_img from "../../assets/Main/background.png";

export default function FlipBook() {
	const flipBookRef = useRef(null);
	const isMobile = useMediaQuery({ maxWidth: 800 }); // e.g. < md

	// MOBILE FALLBACK: no flipping
	if (isMobile) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-light_background" style={{ backgroundImage: `url(${background_img})` }}>
				<div className="w-full max-w-md rounded p-4">
					<MobileLayout />
				</div>
			</div>
		);
	}

	// DESKTOP: Single-page flipping
	return (
		<div className="min-h-screen overflow-hidden flex items-center justify-center bg-light_background" style={{ backgroundImage: `url(${background_img})` }}>
			<div className="min-w-[820px] max-w-[820px] h-[560px] max-h-[560px] bg-amber-900 flex items-start pt-1 justify-center rounded">
				<HTMLFlipBook
					width={400}
					height={550}
					minWidth={800}
					maxWidth={800}
					minHeight={550}
					maxHeight={550}
					showCover={false}
					/* No “binding” shadow in the middle, so they look separate */
					drawShadow={false}
					maxShadowOpacity={0}
					/* Disable user drag/touch flips */
					useMouseEvents={false}
					useTouchEvents={false}
					/* Optional: speed of page turn in ms */
					flippingTime={600}
					/* If you don’t want vertical scroll on mobile, set this false */
					mobileScrollSupport={false}
					className="my-flipbook shadow-2xl"
					ref={flipBookRef}
				>
					{/* Page 1: Login */}
					<div className="page">
						<SinglePageCard flag={false}>
							<InfoPanel />
						</SinglePageCard>
					</div>
					<div className="page">
						<SinglePageCard flag={true}>
							<LoginForm flipBookRef={flipBookRef} />
						</SinglePageCard>
					</div>

					{/* Page 2: Registration Step 1 */}
					<div className="page">
						<SinglePageCard flag={false}>
							<InfoPanel />
						</SinglePageCard>
					</div>
					<div className="page">
						<SinglePageCard flag={true}>
							<RegistrationStepOne flipBookRef={flipBookRef} />
						</SinglePageCard>
					</div>

					{/* Page 3: Registration Step 2 */}
					<div className="page">
						<SinglePageCard flag={false}>
							<InfoPanel />
						</SinglePageCard>
					</div>
					<div className="page">
						<SinglePageCard flag={true}>
							<RegistrationStepTwo flipBookRef={flipBookRef} />
						</SinglePageCard>
					</div>

					{/* Page 4: Registration Step 3 */}
					<div className="page">
						<SinglePageCard flag={false}>
							<InfoPanel />
						</SinglePageCard>
					</div>
					<div className="page">
						<SinglePageCard flag={true}>
							<RegistrationStepThree flipBookRef={flipBookRef} />
						</SinglePageCard>
					</div>
				</HTMLFlipBook>
			</div>
		</div>
	);
}

function SinglePageCard({ children, flag }) {
	return <div className={`w-full h-full flex flex-col items-center justify-center text-amber-900 p-4 bg-[#fffcf7] rounded shadow-md border border-orange-900 border-opacity-30 ${flag ? 'border-l-0' : 'border-r-0'}`}>{children}</div>;
}

function MobileLayout() {
	const [tab, setTab] = useState("login");
	const [regStep, setRegStep] = useState(1);

	const nextRegStep = () => setRegStep((prev) => Math.min(prev + 1, 3));
	const prevRegStep = () => setRegStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className="bg-[#fffcf7] rounded shadow-md p-4">
			<div className="flex justify-center space-x-2 mb-4">
				<button
					onClick={() => {
						setTab("login");
						setRegStep(1);
					}}
					className={`px-4 py-2 rounded ${tab === "login" ? "bg-dark_coral text-white" : "bg-light_coral text-white"}`}
				>
					Zaloguj się
				</button>
				<button
					onClick={() => setTab("register")}
					className={`px-4 py-2 rounded ${tab === "register" ? "bg-dark_coral text-white" : "bg-light_coral text-white"}`}
				>
					Zarejestruj się
				</button>
			</div>

			{tab === "login" && (
				<div>
					<InfoPanel />
					<LoginForm isMobile />
				</div>
			)}

			{tab === "register" && (
				<div>
					<InfoPanel />
					{regStep === 1 && <RegistrationStepOne isMobile nextStep={nextRegStep} />}
					{regStep === 2 && <RegistrationStepTwo isMobile nextStep={nextRegStep} prevStep={prevRegStep} />}
					{regStep === 3 && <RegistrationStepThree isMobile prevStep={prevRegStep} />}
				</div>
			)}
		</div>
	);
}
