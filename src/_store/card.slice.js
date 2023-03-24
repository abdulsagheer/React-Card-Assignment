import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewCard, fetchAllCards } from "services/Apis";

export const createCard = createAsyncThunk(
	"cards/create",
	async (cardData, { getState }) => {
		const { auth } = getState();
		const headers = auth?.user.tokens?.access?.token;
		const { data } = await createNewCard(cardData, headers);
		return data;
	}
);

export const getAllCards = createAsyncThunk(
	"cards/getAll",
	async (_, { getState }) => {
		const { auth } = getState();
		const headers = auth?.user.tokens?.access?.token;
		const { data } = await fetchAllCards(headers);
		console.log("cards", data);
		return data;
	}
);

const cardsSlice = createSlice({
	name: "cards",
	initialState: {
		cards: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createCard.pending, (state) => {
				state.loading = true;
			})
			.addCase(createCard.fulfilled, (state, action) => {
				state.loading = false;
				state.cards?.push(action.payload);
			})
			.addCase(createCard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(getAllCards.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllCards.fulfilled, (state, action) => {
				state.loading = false;
				state.cards = action.payload;
			})
			.addCase(getAllCards.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const cardReducer = cardsSlice.reducer;
