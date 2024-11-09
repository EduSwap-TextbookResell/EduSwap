import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { useEffect } from "react";

export default function Home() {
	const [user, setUser] = useState({ username: "admin", role: "admin" });
	// const [user, setUser] = useState(null);

	useEffect(() => {
		const getUserFromCookies = () => {
			const name = "user=";
			const decodedCookie = decodeURIComponent(document.cookie);
			const ca = decodedCookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === " ") {
					c = c.substring(1);
				}
				if (c.indexOf(name) === 0) {
					return JSON.parse(c.substring(name.length, c.length));
				}
			}
			return null;
		};

		const user = getUserFromCookies();
		if (user) {
			setUser(user);
		}

		console.log(user);
	}, []);

	return (
		<div>
			<Navbar user={user} />
		</div>
	);
}
