import { put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import * as test from "./";

export function* testSaga(action: PayloadAction<string>) {
  console.log(action.payload);
  yield put(test.actions.asycnTest("minsu"));
}

export function* watchTest() {
  yield takeLatest(test.actions.testReducer, testSaga);
}

export function* testAsyncSaga(action: PayloadAction<string>) {
  console.log(action.payload);
  yield put(test.actions.finalTest("final"));
}

export function* watchAycnTest() {
  yield takeLatest(test.actions.asycnTest, testAsyncSaga);
}
