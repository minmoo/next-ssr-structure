import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "iphone";

export interface State {
	isLoading: boolean;
}
const initialState: State = {
	isLoading: false,
};

const reducers = {
	setLoading(state: State, action: PayloadAction<boolean>) {
		state.isLoading = action.payload;
	},
};

const iphoneSlice = createSlice({ name, initialState, reducers });

export default iphoneSlice.reducer;
export const actions = iphoneSlice.actions;
