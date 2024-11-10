import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Main/logo2.png";
import Profile from "../../assets/Main/profile.png";

export default function Navbar(props) {
	const [menu, setMenu] = useState(false);

	return (
		<div>
			<div className="flex flex-row justify-between items-center text-xl px-8 h-[8vh] bg-light_very_gray relative select-none border-b border-gray">
				<div className="h-full flex items-center flex-row gap-2">
					<img src={Logo} className="h-[80%]" />
					<div className="text-2xl font-medium text-center">
						<span className="text-dark_coral"> E</span>du
						<span className="text-dark_coral">S</span>wap
					</div>
				</div>
				<div className="h-full">
					{props.user ? (
						<div onClick={() => setMenu(!menu)} className="select-none cursor-pointer h-full flex items-center space-x-2 relative ">
							<div className="hover:bg-khaki h-full w-full flex items-center flex-row pr-8 pl-2 gap-1">
								<img src={Profile} className="h-10 w-10 rounded-full sele" />
								<p className="select-none capitalize">{props.user.username}</p>
							</div>
							{menu && (
								<div className="absolute top-full text-center right-0 rounded-b-lg bg-light_background border border-t-khaki shadow-lg w-full z-50 transition-all duration-200 ease-in-out">
									<Link to="/dashboard" className="block py-3 hover:bg-khaki border-b border-b-khaki">
										Dashboard
									</Link>
									<Link to="/profile" className="block py-3 hover:bg-khaki border-b border-b-khaki">
										Profile
									</Link>
									<div className="block py-3 hover:bg-khaki" onClick={props.logout}>
										Logout
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="flex items-center space-x-2 h-full">
							<Link to="/signup/login" className=" flex flex-row items-center px-5 h-full gap-1">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mt-1"
								>
									<path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
									<polyline points="17 16 21 12 17 8" />
									<line x1="21" y1="12" x2="9" y2="12" />
								</svg>

								<p>Login</p>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
