import { useState } from 'react';
import Navbar from './Navbar.jsx';
import { useLocation } from 'react-router-dom';
import background_img from '../../assets/Main/background.png';
import search_icon from '../../assets/Main/search.png';
import messages_icon from '../../assets/Main/messages.png';
import addbook_icon from '../../assets/Main/addbook.png';
import Search_content from '../Search/Searcher.jsx';
import Messages_content from '../Messages/Messages.jsx';
import Seller_content from '../Seller/Seller.jsx';
export default function Home({activeCard: initialActiveCard}) {
  const location = useLocation();
  const user = location.state?.user;
  const [activeCard, setActiveCard] = useState(initialActiveCard || 'Searcher');
  
  const renderContent = () => {
    switch (activeCard) {
      case 'Searcher':
        return <Search_content />;
      case 'Seller':
        return <Seller_content />;
      case 'Messages':
        return <Messages_content />;
      default:
        return null;
    }
  };
  return (
    <div
      className="flex min-h-screen justify-center bg-light_background bg-blend-darken"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="max-w-screen flex">
        <div>
          <div>
            <Navbar user={user} className="drop-shadow-2xl" />
          </div>
          <div className="mt-8 flex flex-col items-center gap-8">
            <div className="mr-80 flex">
              <div
                className={`h-[20vh] w-[15vw] rounded-[20px] ${activeCard === 'Searcher' ? 'bg-light_very_gray' : 'bg-light_gray'} drop-shadow-xl`}
                onClick={() => setActiveCard('Searcher')}
              >
                <div className="flex">
                  <img src={search_icon} className="ml-5 mt-1" />
                  <p className="ml-6 mt-2 text-center text-light_coral">
                    Wyszukiwarka
                  </p>
                </div>
              </div>
              <div
                className={`h-[20vh] w-[15vw] rounded-[20px] ${activeCard === 'Seller' ? 'bg-light_very_gray' : 'bg-light_gray'} drop-shadow-xl ml-5`}
                onClick={() => setActiveCard('Seller')}
              >
                <div className="flex">
                  <img src={addbook_icon} className="ml-5 mt-2" />
                  <p className="ml-6 mt-2 text-center text-light_coral">
                    Wystaw książkę
                  </p>
                </div>
              </div>
              <div
                className={`h-[20vh] w-[15vw] rounded-[20px] ${activeCard === 'Messages' ? 'bg-light_very_gray' : 'bg-light_gray'} drop-shadow-xl ml-5`}
                onClick={() => setActiveCard('Messages')}
              >
                <div className="flex">
                  <img src={messages_icon} className="ml-5 mt-2" />
                  <p className="ml-6 mt-2 text-center text-light_coral">
                    Wiadomości
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[-9%] h-[80vh] w-[80vw] rounded-[69px] bg-light_very_gray drop-shadow-xl">
              <div className="ml-10 mt-10">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
