import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./CreateCard.css";
import { useSelector, useDispatch } from "react-redux";
import { createCard, getAllCards } from "_store/card.slice";

const CreateCard = () => {
	const [cardData, setCardData] = useState({
		cvc: "",
		cardExpiration: "",
		name: "",
		cardHolder: "",
		cardNumber: "",
		category: "",
		focus: "",
	});

	const loading = useSelector((state) => state.cards.loading);
	const error = useSelector((state) => state.cards.error);
	const dispatch = useDispatch();

	useEffect(() => {
		// fetch all cards when component mounts
		dispatch(getAllCards());
	}, [dispatch]);

	const handleInputFocus = (e) => {
		setCardData({ ...cardData, focus: e.target.name });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCardData({ ...cardData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, cardExpiration, cardHolder, cardNumber, category } = cardData;
		dispatch(
			createCard({
				name,
				cardExpiration,
				cardHolder,
				cardNumber,
				category,
			})
		);
		// clear the form after submission
		setCardData({
			cvc: "",
			name: "",
			cardExpiration: "",
			cardHolder: "",
			cardNumber: "",
			category: "",
			focus: "",
		});
	};

	return (
		<div id="PaymentForm">
			<Cards
				cvc={cardData.cvc}
				expiry={cardData.cardExpiration}
				focused={cardData.focus}
				name={cardData.cardHolder}
				number={cardData.cardNumber}
				issuer={cardData.category}
			/>
			<form onSubmit={handleSubmit}>
				<input
					type="tel"
					name="cardNumber"
					placeholder="Card Number"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.cardNumber}
				/>
				<input
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.name}
				/>
				<input
					type="text"
					name="cardHolder"
					placeholder="Card Holder Name"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.cardHolder}
				/>
				<input
					type="tel"
					name="cardExpiration"
					placeholder="MM/YY Expiry"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.cardExpiration}
				/>
				<input
					type="tel"
					name="cvc"
					placeholder="CVC"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.cvc}
				/>
				<select
					name="category"
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					value={cardData.category}>
					<option value="VISA">VISA</option>
					<option value="MC">Mastercard</option>
					<option value="AE">American Express</option>
				</select>
				<button type="submit" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default CreateCard;
