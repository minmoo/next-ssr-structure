import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import auth, { Tauth } from "./auth";
import admin, { Tadmin } from "./admin";
import iphone, { State as IphoneState } from "./iphone";
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from "react-redux";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
	auth,
	admin,
	iphone,
});

const reducer = (
	state:
		| CombinedState<{ auth: Tauth; admin: Tadmin; iphone: IphoneState }>
		| undefined,
	action: AnyAction,
) => {
	//서버에서 생성한 스토어의 상태를 HYDRATE라는 액션을 통해서 클라이언트에 합쳐주는 작업을 해서
	//클라이언트에서 사용할 수 있게 해준다.
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
	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer,
		devTools: true,
		middleware: [sagaMiddleware],
	});

	sagaMiddleware.run(rootSaga);

	return store;
};

export const wrapper = createWrapper(initStore);

//1 타입 지원하는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
//2
// declare module "react-redux" {
//   interface DefaultRootState extends RootState {}
// }
