import { useState } from "react";
import Searcher from "./Search/Searcher.jsx";
import Seller from "./Seller/Seller.jsx";
import Messages from "./Messages/Messages.jsx";

// zamienić ikony na svg
import search_icon from "../../../assets/Main/search.svg";
import addbook_icon from "../../../assets/Main/addbook.svg";
import messages_icon from "../../../assets/Main/messages.svg";
// ----------------------------

export default function Main() {
	const [activeCard, setActiveCard] = useState("Searcher");

	const renderContent = () => {
		switch (activeCard) {
			case "Searcher":
				return <Searcher/>;
			case "Seller":
				return <Seller />;
			case "Messages":
				return <Messages />;
			default:
				return null;
		}
	};

	return (
		<div>
			<div className="w-full flex flex-col items-center mt-8">
				<div className="flex flex-row px-[16vw] space-x-4 justify-center select-none w-full">
					{["Searcher", "Seller", "Messages"].map((card) => (
						<div
							key={card}
							className={`flex-1 rounded-t-3xl ${
								activeCard === card ? "bg-light_very_gray" : "bg-light_gray"
							} drop-shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out w-full max-w-64`}
							onClick={() => setActiveCard(card)}
						>
							<div className="flex items-center p-2 px-4 h-[52px] w-full justify-center space-x-2">
								<img src={card === "Searcher" ? search_icon : card === "Seller" ? addbook_icon : messages_icon} className="h-6 w-6" />
								<p
									className={`text-light_coral text-center ${
										activeCard === card ? "block truncate" : "hidden sm:block overflow-hidden truncate"
									} w-fit`}
								>
									{card === "Searcher" ? "Wyszukiwarka" : card === "Seller" ? "Wystaw książkę" : "Wiadomości"}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="h-[80vh] w-[80vw] rounded-t-3xl bg-light_very_gray drop-shadow-2xl overflow-y-auto scroll-smooth">
					<div className="mt-10">{renderContent()}</div>
				</div>
			</div>
		</div>
	);
}
