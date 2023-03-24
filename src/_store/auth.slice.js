import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "services/Apis";
import { history } from "_helpers";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || "",
	error: null,
};

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }) => {
		const { data } = await loginRequest({ email, password });
		return data;
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
			history.navigate("/login");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				const user = action.payload;
				localStorage.setItem("user", JSON.stringify(user));
				state.user = user;
				const { from } = history.location.state || { from: { pathname: "/" } };
				history.navigate(from);
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
