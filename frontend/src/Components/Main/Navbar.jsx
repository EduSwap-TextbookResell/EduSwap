import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
	const [menu, setMenu] = useState(false);

	return (
		<div>
			<div className="flex flex-row justify-between items-center text-xl px-8 h-[8vh] bg-light_background border relative">
				<div>
					<img src="" alt="" />
				</div>
				<div className="h-full">
					{props.user ? (
						<div onClick={() => setMenu(!menu)} className="select-none cursor-pointer h-full flex items-center space-x-2 relative border-x border-khaki">
							<div className="hover:bg-khaki h-full w-full flex items-center px-4">
								<p className="pb-1">Hello {props.user.username}</p>
							</div>
							{menu && (
								<div className="absolute top-full text-center right-0 rounded-b-lg bg-light_background border border-t-khaki shadow-lg w-full z-50 transition duration-300 ease-linear">
									<Link to="/dashboard" className="block py-2 hover:bg-khaki border-b border-b-khaki">Dashboard</Link>
									<Link to="/profile" className="block py-2 hover:bg-khaki border-b border-b-khaki">Profile</Link>
									<Link to="/logout" className="block py-2 hover:bg-khaki">Logout</Link>
								</div>
							)}
						</div>
					) : (
						<div className="flex items-center space-x-2 h-full">
							<Link to="/signup/login" className=" flex flex-row items-center px-2 h-full">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
									<polyline points="17 16 21 12 17 8" />
									<line x1="21" y1="12" x2="9" y2="12" />
								</svg>
								<p className="pb-1">Login</p>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
