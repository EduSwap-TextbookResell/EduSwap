// import img1 from '../../../assets/Login_Registration/hand_money.png';
// import img2 from '../../../assets/Login_Registration/hand_book_hand.png';
// import img3 from '../../../assets/Login_Registration/3hands_3books.png';

export default function InfoPanel() {
  return (
    // <div className="h-full w-full md:h-[86vh] md:w-[30vw] rounded-[8px] bg-dark_coral text-light_background p-6 flex flex-col justify-between opacity-70 overflow-hidden">
    //   {/* Section 1 */}
    //   <div className="text-center">
    //     <p className="text-lg font-semibold">Sprzedawaj swoje książki</p>
    //     <img src={img1} alt="hand_money" className="mx-auto h-32 object-contain" />
    //   </div>

    //   {/* Section 2 */}
    //   <div className="text-center">
    //     <p className="text-lg font-semibold">W szybki sposób odkupuj podręczniki</p>
    //     <img src={img2} alt="hand_book_money" className="mx-auto h-32 object-contain" />
    //   </div>

    //   {/* Section 3 */}
    //   <div className="text-center">
    //     <p className="text-lg font-semibold">Filtruj książki na swoje potrzeby</p>
    //     <img src={img3} alt="3hand_books" className="mx-auto h-32 object-contain" />
    //   </div>
    // </div>
    
    <div className="text-center p-4">
      <h2 className="text-xl font-bold mb-2 text-dark_coral">Informacje</h2>
      <p className="text-gray mb-4">
        Tutaj możesz umieścić swój tekst informacyjny, 
        wskazówki dotyczące wymiany książek, 
        lub cokolwiek innego chcesz pokazać użytkownikowi.
      </p>
      {/* Add any images, icons, or additional styling you like */}
    </div>
  );
}
