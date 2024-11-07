//import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { useLocation } from "react-router-dom";
import background_img from '../../assets/Main/background.png';
export default function Home() {

	const location = useLocation();
	const user = location.state?.user;
	return (
		<div className="flex min-h-screen justify-center bg-light_background bg-blend-darken"
		style={{ backgroundImage: `url(${background_img})` }}>
		<div className="flex max-w-screen ">
			<div>
			<div>
			<Navbar user={user} />
			</div>
			<div className="relative">
					<div className="bg-light_very_gray rounded-[45px] w-[15vw] h-[14vh] absolute left-0 top-[-8%] ml-64 border-4 border-black"> asdadas</div>
                    <div className="center bg-light_very_gray rounded-[69px] m-auto w-[70vw] h-[75vh] mt-16"> </div>
            </div>
			</div>
		</div>
	</div>
	);
}
