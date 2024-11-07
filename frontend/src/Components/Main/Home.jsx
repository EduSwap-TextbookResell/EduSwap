//import { useState } from "react";
import Navbar from './Navbar.jsx';
import { useLocation } from 'react-router-dom';
import background_img from '../../assets/Main/background.png';
import search_icon from '../../assets/Main/search.png';
import messages_icon from '../../assets/Main/messages.png';
import addbook_icon from '../../assets/Main/addbook.png'
export default function Home() {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div
      className="flex min-h-screen justify-center bg-light_background bg-blend-darken"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="max-w-screen flex">
        <div>
          <div>
            <Navbar user={user} className='drop-shadow-2xl' />
          </div>
          <div className="mt-8 flex flex-col items-center gap-8">
            <div className="flex mr-36">
              <div className=" h-[20vh] w-[18vw] rounded-[20px] bg-light_very_gray drop-shadow-xl">
                <div className='flex'><img src={search_icon} className='ml-5 mt-1'/><p className="mt-2 ml-6 text-center text-light_coral ">Wyszukiwarka</p></div>
              </div>
              <div className="h-[20vh] w-[18vw] rounded-[20px] bg-light_gray ml-6 drop-shadow-xl">
			  <div className='flex'><img src={addbook_icon} className='ml-5 mt-2'/><p className="mt-2 ml-6 text-center text-light_coral ">Wystaw książkę</p></div>
              </div>
              <div className="h-[20vh] w-[18vw] rounded-[20px] bg-light_gray ml-6 drop-shadow-xl">
			  <div className='flex'><img src={messages_icon} className='ml-5 mt-2'/><p className="mt-2 ml-6 text-center text-light_coral ">Wiadomości</p></div>
              </div>
            </div>
            <div className="mt-[-9%] h-[80vh] w-[80vw] rounded-[69px] bg-light_very_gray drop-shadow-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
