import { AxiosRequest } from "./ApiCall";

const baseUrl = process.env.REACT_APP_API_URL;

export const loginRequest = async (data, header) => {
	return await AxiosRequest("POST", `${baseUrl}/auth/login`, data, header);
};

export const getAllUsers = async (header) => {
	return await AxiosRequest("GET", `${baseUrl}/users`, {
		Authorization: `Bearer ${header}`,
		"Content-Type": "application/json",
	});
};

export const fetchAllCards = async (header) => {
	return await AxiosRequest("GET", `${baseUrl}/cards`, {
		Authorization: `Bearer ${header}`,
		"Content-Type": "application/json",
	});
};

export const createNewCard = async (data, header) => {
	return await AxiosRequest("POST", `${baseUrl}/cards`, data, {
		Authorization: `Bearer ${header}`,
		"Content-Type": "application/json",
	});
};
