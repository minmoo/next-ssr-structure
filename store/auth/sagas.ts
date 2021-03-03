import {
  put,
  takeLatest,
  call,
  takeEvery,
  all,
  fork,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions, TsignUp, Tlogin } from "./";
import { signUpAPI } from "../../lib/api/auth/signUp";
import { loginAPI } from "../../lib/api/auth/login";
import { logoutAPI } from "../../lib/api/auth/logout";

function* signUpSaga(action: PayloadAction<TsignUp>) {
  try {
    const { data } = yield call(signUpAPI, action.payload);
    yield put(actions.setLoggedUser(data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchSignUp() {
  yield takeLatest(actions.asyncSignUp, signUpSaga);
}

function* loginSaga(action: PayloadAction<Tlogin>) {
  try {
    const { data } = yield call(loginAPI, action.payload);
    yield put(actions.setLoggedUser(data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchLogin() {
  yield takeEvery(actions.asyncLogin, loginSaga);
}

function* logoutSaga() {
  try {
    yield call(logoutAPI);
    yield put(actions.init());
  } catch (e) {
    console.log(e);
  }
}

export function* watchLogout() {
  yield takeEvery(actions.asyncLogout, logoutSaga);
}

export default function* watchAuth() {
  yield all([fork(watchSignUp), fork(watchLogin), fork(watchLogout)]);
}
