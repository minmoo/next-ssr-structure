import watchAuth from "./auth/sagas";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga(): Generator {
	yield all([fork(watchAuth)]);
}
