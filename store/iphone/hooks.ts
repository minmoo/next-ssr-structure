import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actions } from ".";
import { Modal } from "./slice";

export const useShowDialog = () => {
	const dispatch = useDispatch();
	const onShowDialog = useCallback(
		(param: Modal) => dispatch(actions.showDialog(param)),
		[dispatch],
	);

	return onShowDialog;
};

export const useCloseDialog = () => {
	const dispatch = useDispatch();
	const onCloseDialog = useCallback(
		() => dispatch(actions.closeDialog()),
		[dispatch],
	);

	return onCloseDialog;
};
