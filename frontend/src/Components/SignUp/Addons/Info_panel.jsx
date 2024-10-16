import img1 from "../../../assets/Login_Registration/hand_money.png";
import img2 from "../../../assets/Login_Registration/hand_book_hand.png";
import img3 from "../../../assets/Login_Registration/3hands_3books.png";
export default function Info_panel() {
	return <div>
		<div className="bg-dark_coral rounded-[53px] w-[30vw] h-[86vh] mr-4 mt-2.5 opacity-[67%] text-light_background">
			<p className="text-center mt-3"> <br></br>Sprzedawaj swoje ksiazki</p>
			<p className="">
			<img src={`${img1}`} alt="hand_money" className="contrast-200 bg-blend-darken h-40 ml-[30%] " ></img></p>
			<p className="text-center mt-2.5"> W szybki sposób odkupuj podręczniki</p>
			<p className="">
			<img src={`${img2}`} alt="hand_book_money" className="contrast-200 bg-blend-darken h-40 ml-[20%]"></img></p>
			<p className="text-center mt-2.5"> Filtruj książki na swoje potrzeby</p>
			<p className="">
			<img src={`${img3}`} alt="3hand_books" className="contrast-200 bg-blend-darken h-40 ml-[20%]"></img></p>
		</div>
	</div>;
}
