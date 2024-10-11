import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Main/Home";
import SignUp from "./Components/SignUp/SignUp";

export default function App() {
	return <div className="m-auto">
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup/:action" element={<SignUp />} />
			</Routes> 
		</BrowserRouter>
	</div>;
}
