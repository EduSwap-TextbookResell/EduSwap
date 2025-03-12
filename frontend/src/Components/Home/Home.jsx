import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Background_Img from '../../assets/Main/background.png';
import Main from './Main/Main.jsx';

export default function Home() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    // fetch user data
    setUser({ username: 'admin' });
  };

  const logout = () => {
    // logout user
    setUser(null);
  };

  return (
    <div
      className="h-full bg-light_background bg-blend-darken"
      style={{ backgroundImage: `url(${Background_Img})` }}
    >
      <Navbar user={user} logout={logout} />
      <div className="absolute right-2 mt-4 flex items-center justify-center">
        <input
          type="button"
          value="Add User"
          onClick={getUser}
          className="cursor-pointer rounded-2xl border bg-dark_coral p-2 font-bold"
        />
      </div>
      <Main />
    </div>
  );
}
