import { createSlice } from "@reduxjs/toolkit";

const name = "main";

export type TLink = {
	title: string;
	path: string;
	icon?: string;
};

export type TInitMain = {
	header: {
		title: string;
	};
	navbar: {
		links: TLink[];
	};
};

const initialState: TInitMain = {
	header: {
		title: "Portfolio",
	},
	navbar: {
		links: [
			{
				title: "home",
				path: "/",
				icon: "home",
			},
			{
				title: "menu",
				path: "/",
				icon: "menu",
			},
		],
	},
};

const reducers = {};

const mainSlice = createSlice({ name, initialState, reducers });

export default mainSlice.reducer;
export const actions = mainSlice.actions;
