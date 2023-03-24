import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "services/Apis";

const name = "users";

const initialState = {
	users: {},
};

export const getAll = createAsyncThunk(
	`${name}/getAll`,
	async (_, { getState }) => {
		const { auth } = getState();
		const headers = auth?.user.tokens?.access?.token;
		const { data } = await getAllUsers(headers);
		console.log("data", data);
		return data;
	}
);

const usersSlice = createSlice({
	name: name,
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAll.pending, (state) => {
				state.users = { loading: true };
			})
			.addCase(getAll.fulfilled, (state, action) => {
				state.users = action.payload;
			})
			.addCase(getAll.rejected, (state, action) => {
				state.users = { error: action.error };
			});
	},
});

export const usersReducer = usersSlice.reducer;
