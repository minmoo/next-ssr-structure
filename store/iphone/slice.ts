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
	isLoading: false, //페이지의 초기 로딩을 보여준다.(이미지로딩이 끝날때 페이지를 보여주기 위해)
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
