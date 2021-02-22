import { combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import test from "./test";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

const rootReducer = combineReducers({
  test,
});

const reducer = (state, action) => {
  //서버에서 생성한 리덕스 스토어를 클라이언트에서 사용할 수 있게 해준다.
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, //use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  }

  return rootReducer(state, action);
};

//스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

//미들웨어 적용을 위한 스토어 enhancer
const initStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
    middleware: [],
  });

  return store;
};

export const wrapper = createWrapper(initStore);

//1 타입 지원하는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
//2
// declare module "react-redux" {
//   interface DefaultRootState extends RootState {}
// }
