import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tadmin } from "./types";

const name = "admin";

const initialState: Tadmin = {
	toolbar: {
		title: "Brain",
		time: new Date().toDateString(),
	},
	navbar: {
		isFix: true,
		isOpen: false,
		items: [
			{
				id: "dashboard",
				title: "Dashboard",
				url: "/admin/dashboard",
				icon: "dashboard",
			},
			{
				id: "map",
				title: "Map",
				url: "/admin/map",
				icon: "map",
			},
			{
				id: "pages",
				title: "Pages",
				icon: "libraryBooks",
				subItems: [
					{
						id: "pages1-1",
						title: "Pages1-1",
					},
					{
						id: "pages1-2",
						title: "Pages1-2",
						subItems: [
							{
								id: "pages2-1",
								title: "Pages2-1",
							},
							{
								id: "pages2-2",
								title: "Pages2-2",
							},
						],
					},
				],
			},
		],
	},
};

const reducers = {
	navbarOpenToggle(state: Tadmin) {
		state.navbar.isOpen = !state.navbar.isOpen;
	},
	navbarFixToggle(state: Tadmin) {
		state.navbar.isFix = !state.navbar.isFix;
	},
	setTime(state: Tadmin, action: PayloadAction<string>) {
		state.toolbar.time = action.payload;
	},
};

const adminSlice = createSlice({ name, initialState, reducers });

export default adminSlice.reducer;
export const actions = adminSlice.actions;
