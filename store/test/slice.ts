import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTest } from "./types";

const name = "test";

const initialState: TTest = {
  id: "",
  pwd: "",
};

const reducers = {
  testReducer(state, action: PayloadAction<string>) {
    state.id = action.payload;
  },
};

const testSlice = createSlice({
  name,
  initialState,
  reducers,
});

export default testSlice.reducer;
export const actions = testSlice.actions;
