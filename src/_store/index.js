import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth.slice";
import { cardReducer } from "./card.slice";
import { usersReducer } from "./users.slice";

export * from "./auth.slice";
export * from "./users.slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: usersReducer,
		cards: cardReducer,
	},
});
