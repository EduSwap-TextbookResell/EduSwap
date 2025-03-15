import img1 from '../../../assets/Login_Registration/hand_money.png';
import img2 from '../../../assets/Login_Registration/hand_book_hand.png';
import img3 from '../../../assets/Login_Registration/3hands_3books.png';

export default function Info_panel() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[8px] bg-dark_coral p-6 text-light_background opacity-70 md:h-[86vh] md:w-[30vw]">
      {/* Section 1 */}
      <div className="text-center">
        <p className="text-lg font-semibold">Sprzedawaj swoje książki</p>
        <img
          src={img1}
          alt="hand_money"
          className="mx-auto h-32 object-contain"
        />
      </div>

      {/* Section 2 */}
      <div className="text-center">
        <p className="text-lg font-semibold">
          W szybki sposób odkupuj podręczniki
        </p>
        <img
          src={img2}
          alt="hand_book_money"
          className="mx-auto h-32 object-contain"
        />
      </div>

      {/* Section 3 */}
      <div className="text-center">
        <p className="text-lg font-semibold">
          Filtruj książki na swoje potrzeby
        </p>
        <img
          src={img3}
          alt="3hand_books"
          className="mx-auto h-32 object-contain"
        />
      </div>
    </div>
  );
}
