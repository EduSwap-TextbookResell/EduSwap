import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo_icon from '../../assets/Main/logo2.png';
import profile_icon from '../../assets/Main/profile.png'
export default function Navbar(props) {
	const [menu, setMenu] = useState(false);
	const location = useLocation();
	const user = location.state?.user;
	return (
		<div className="w-[96rem] h-14 bg-light_very_gray">
			<div className="flex flex-row justify-between px-8">
				{/* <div>
					<img src="../../assets/Login_Registration/hand_money.png" alt="" />
				</div> */}
				<div>
					<img src={logo_icon} className="h-12"/>
					{props.user ? (
						<div onClick={()=>setMenu(!menu)} className="select-none ml-[84rem] mt-[-2.5%] flex">
							<div className="ml-[-44%] mb-6"><img src={profile_icon} className="h-9 w-9 rounded-full mt-auto" /></div>
							<p className="pl-8 mt-1 text-light_coral">Hello {user.nick}</p>
							</div>
					) : (
						<div className=" ml-[84rem] mt-[-2.5%]">
							<Link to="/signup/login">Login</Link>
							<Link to="/signup/register">Register</Link>
						</div>
					)}
					{menu ? (
						<div className="flex flex-col ml-[84rem] mt-3 bg-light_gray bg-blend-darken">
							<Link to="/dashboard">Dashboard</Link>
							<Link to="/profile">Profile</Link>
							<Link to="/logout">Logout</Link>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
