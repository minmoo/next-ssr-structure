import { watchTest, watchAycnTest } from "./test/sagas";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga(): Generator {
  yield all([fork(watchTest), fork(watchAycnTest)]);
}
