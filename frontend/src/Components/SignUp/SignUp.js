import React from "react";
import { useParams } from "react-router-dom";

export default function SignUp() {
	const { action } = useParams();

	const isLogin = action === "login"; // http://localhost:3000//signup/login => isLogin = true | http://localhost:3000//signup/signup => isLogin = false

	return <div>SignUp {isLogin ? <p>Yes</p> : <p>No</p>}</div>;
}
