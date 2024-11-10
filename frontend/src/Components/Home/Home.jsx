import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Background_Img from "../../assets/Main/background.png";
import Main from './Main/Main.jsx';

export default function Home() {
	const [user, setUser] = useState(null);

	const getUser = () => {
		// fetch user data
		setUser({ username: "admin" });
	};

	const logout = () => {
		// logout user
		setUser(null);
	}

	return (
		<div className="bg-light_background bg-blend-darken h-full" style={{ backgroundImage: `url(${Background_Img})` }}>
			<Navbar user={user} logout={logout} />
			<div className="flex items-center justify-center mt-4 right-2 absolute">
				<input
					type="button"
					value="Add User"
					onClick={getUser}
					className="bg-dark_coral rounded-2xl p-2 font-bold border cursor-pointer"
				/>
			</div>
			<Main />
		</div>
	);
}
