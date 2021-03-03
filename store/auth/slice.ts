import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tauth, TsignUp, TuserInfo, Tlogin } from "./types";

const name = "auth";

const initialState: Tauth = {
  userId: "",
  name: "",
  isLogged: false,
};

const reducers = {
  asyncSignUp(state: Tauth, action: PayloadAction<TsignUp>) {},
  asyncLogin(state: Tauth, action: PayloadAction<Tlogin>) {},
  asyncLogout(state: Tauth) {},
  setLoggedUser(state: Tauth, action: PayloadAction<TuserInfo>) {
    state = { ...action.payload, isLogged: true };
    return state;
  },
  init(state: Tauth) {
    state = initialState;
    return state;
  },
};

const userSlice = createSlice({ name, initialState, reducers });

export default userSlice.reducer;
export const actions = userSlice.actions;
