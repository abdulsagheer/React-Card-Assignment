import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards } from "_store/card.slice";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import "./Card.css";

const cards = [
	{
		category: "AE",
		name: "Jon Doe",
		cardExpiration: "8/2025",
		cardHolder: "JOHN DOE",
		cardNumber: "4532 3579 1360 1234",
		id: "63c6f21017163e001d5dae18",
	},
	{
		category: "MC",
		name: "Ram's SBI Card",
		cardExpiration: "8/2023",
		cardHolder: "RAM SINGH",
		cardNumber: "1232 7991 1470 1256",
		id: "63c6f27417163e001d5dae21",
	},
	{
		category: "VISA",
		name: "Sobin's HDFC Card",
		cardExpiration: "8/2026",
		cardHolder: "SOBIN GEORGE THOMAS",
		cardNumber: "4532 7991 1360 8687",
		id: "63f497fec61ca9001d5cb1a4",
	},
	{
		category: "VISA",
		name: "Robin's HDFC Card",
		cardExpiration: "8/2026",
		cardHolder: "SBIN GEORGE THOMAS",
		cardNumber: "4532 7991 1360 8687",
		id: "63f4e664226583001e35f2af",
	},
	{
		category: "VISA",
		name: "Sobin's HDFC Card",
		cardExpiration: "8/2026",
		cardHolder: "SOBIN GEORGE THOMAS",
		cardNumber: "4532 7991 1360 8687",
		id: "63f4ea60b1340c001d167857",
	},
	{
		category: "VISA",
		name: "Sobin's HDFC Card",
		cardExpiration: "8/2026",
		cardHolder: "SOBIN GEORGE THOMAS",
		cardNumber: "4532 7991 1360 8687",
		id: "63f4f82e589ffd001d88d400",
	},
	{
		category: "MC",
		name: "Rushiksh",
		cardExpiration: "11/22",
		cardHolder: "Kumbhar",
		cardNumber: "1111222233334444",
		id: "63f4fbe7589ffd001d88d40e",
	},
	{
		category: "MC",
		name: "Rushiksh",
		cardExpiration: "11/22",
		cardHolder: "Kumbhar",
		cardNumber: "1111222233334444",
		id: "63f4fbfb589ffd001d88d411",
	},
];

const Card = () => {
	const dispatch = useDispatch();
	const { cards, loading, error } = useSelector((state) => state.cards);

	useEffect(() => {
		dispatch(getAllCards());
	}, [dispatch]);

	return (
		<div className="card-list-container">
			<h1>Card Lists</h1>
			{loading ? (
				<p>Loading cards...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<div className="card-list">
					{cards?.map((card) => (
						<Cards
							className="cards"
							key={card.id}
							cvc={card.cvc}
							expiry={card.cardExpiration}
							focused={card.focus}
							name={card.cardHolder}
							number={card.cardNumber}
							issuer={card.category}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Card;
