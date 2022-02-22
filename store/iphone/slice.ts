import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "iphone";
export interface Modal {
	open: boolean;
	title: string;
	queryKey: any;
}
export interface State {
	isLoading: boolean;
	authority: "admin" | "guest";
	modal: Modal;
}
const initialState: State = {
	isLoading: false,
	authority: "admin",
	modal: {
		open: false,
		title: "",
		queryKey: "",
	},
};

const reducers = {
	setLoading(state: State, action: PayloadAction<boolean>) {
		state.isLoading = action.payload;
	},
	closeDialog(state: State) {
		state.modal = initialState.modal;
	},
	showDialog(state: State, action: PayloadAction<Modal>) {
		state.modal = action.payload;
	},
};

const iphoneSlice = createSlice({ name, initialState, reducers });

export default iphoneSlice.reducer;
export const actions = iphoneSlice.actions;
