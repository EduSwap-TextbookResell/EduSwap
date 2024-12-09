import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between px-8">
        <div>
          <img src="../../assets/Login_Registration/hand_money.png" alt="" />
        </div>
        <div>
          {props.user ? (
            <div onClick={() => setMenu(!menu)} className="select-none">
              Hello {props.user.name}
            </div>
          ) : (
            <div>
              <Link to="/signup/login">Login</Link>
              <Link to="/signup/register">Register</Link>
            </div>
          )}
          {menu ? (
            <div className="flex flex-col">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
