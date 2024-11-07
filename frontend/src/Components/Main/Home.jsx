//import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { useLocation } from "react-router-dom";

export default function Home() {

	const location = useLocation();
	const user = location.state?.user;
	return (
		<div>
			<Navbar user={user}/>
		</div>
	);
}
