import img1 from '../../../assets/Login_Registration/hand_money.png';
import img2 from '../../../assets/Login_Registration/hand_book_hand.png';
import img3 from '../../../assets/Login_Registration/3hands_3books.png';
export default function Info_panel() {
  return (
    <div>
      <div className="mr-4 mt-2.5 h-[86vh] w-[30vw] rounded-[53px] bg-dark_coral text-light_background opacity-[67%]">
        <p className="mt-3 text-center">
          {' '}
          <br></br>Sprzedawaj swoje ksiazki
        </p>
        <p className="">
          <img
            src={`${img1}`}
            alt="hand_money"
            className="ml-[30%] h-40 bg-blend-darken contrast-200"
          ></img>
        </p>
        <p className="mt-2.5 text-center">
          {' '}
          W szybki sposób odkupuj podręczniki
        </p>
        <p className="">
          <img
            src={`${img2}`}
            alt="hand_book_money"
            className="ml-[20%] h-40 bg-blend-darken contrast-200"
          ></img>
        </p>
        <p className="mt-2.5 text-center"> Filtruj książki na swoje potrzeby</p>
        <p className="">
          <img
            src={`${img3}`}
            alt="3hand_books"
            className="ml-[20%] h-40 bg-blend-darken contrast-200"
          ></img>
        </p>
      </div>
    </div>
  );
}
