import { useState } from 'react';
import Searcher from './Search/Searcher.jsx';
import Seller from './Seller/Seller.jsx';
import Messages from './Messages/Messages.jsx';

// zamienić ikony na svg
import search_icon from '../../../assets/Main/search.svg';
import addbook_icon from '../../../assets/Main/addbook.svg';
import messages_icon from '../../../assets/Main/messages.svg';
// ----------------------------

export default function Main() {
  const [activeCard, setActiveCard] = useState('Searcher');

  const renderContent = () => {
    switch (activeCard) {
      case 'Searcher':
        return <Searcher />;
      case 'Seller':
        return <Seller />;
      case 'Messages':
        return <Messages />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mt-8 flex w-full flex-col items-center">
        <div className="flex w-full select-none flex-row justify-center space-x-4 px-[16vw]">
          {['Searcher', 'Seller', 'Messages'].map((card) => (
            <div
              key={card}
              className={`flex-1 rounded-t-3xl ${
                activeCard === card ? 'bg-light_very_gray' : 'bg-light_gray'
              } flex w-full max-w-64 cursor-pointer items-center justify-center drop-shadow-2xl transition-all duration-200 ease-in-out`}
              onClick={() => setActiveCard(card)}
            >
              <div className="flex h-[52px] w-full items-center justify-center space-x-2 p-2 px-4">
                <img
                  src={
                    card === 'Searcher'
                      ? search_icon
                      : card === 'Seller'
                        ? addbook_icon
                        : messages_icon
                  }
                  className="h-6 w-6"
                />
                <p
                  className={`text-center text-light_coral ${
                    activeCard === card
                      ? 'block truncate'
                      : 'hidden overflow-hidden truncate sm:block'
                  } w-fit`}
                >
                  {card === 'Searcher'
                    ? 'Wyszukiwarka'
                    : card === 'Seller'
                      ? 'Wystaw książkę'
                      : 'Wiadomości'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[80vh] w-[80vw] rounded-t-3xl bg-light_very_gray drop-shadow-2xl">
          <div className="mt-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
