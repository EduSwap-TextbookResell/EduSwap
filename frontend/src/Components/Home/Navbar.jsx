import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Main/logo2.png';
import Profile from '../../assets/Main/profile.png';

export default function Navbar(props) {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div className="relative flex h-[8vh] select-none flex-row items-center justify-between border-b border-gray bg-light_very_gray px-8 text-xl">
        <div className="flex h-full flex-row items-center gap-2">
          <img src={Logo} className="h-[80%]" />
          <div className="text-center text-2xl font-medium">
            <span className="text-dark_coral"> E</span>du
            <span className="text-dark_coral">S</span>wap
          </div>
        </div>
        <div className="h-full">
          {props.user ? (
            <div
              onClick={() => setMenu(!menu)}
              className="relative flex h-full cursor-pointer select-none items-center space-x-2"
            >
              <div className="flex h-full w-full flex-row items-center gap-1 pl-2 pr-8 hover:bg-khaki">
                <img src={Profile} className="sele h-10 w-10 rounded-full" />
                <p className="select-none capitalize">{props.user.username}</p>
              </div>
              {menu && (
                <div className="absolute right-0 top-full z-50 w-full rounded-b-lg border border-t-khaki bg-light_background text-center shadow-lg transition-all duration-200 ease-in-out">
                  <Link
                    to="/dashboard"
                    className="block border-b border-b-khaki py-3 hover:bg-khaki"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block border-b border-b-khaki py-3 hover:bg-khaki"
                  >
                    Profile
                  </Link>
                  <div
                    className="block py-3 hover:bg-khaki"
                    onClick={props.logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center space-x-2">
              <Link
                to="/signup/login"
                className="flex h-full flex-row items-center gap-1 px-5"
              >
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
