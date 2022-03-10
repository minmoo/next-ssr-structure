import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "@/store";
import { actions } from "@/store/iphone";
import AdminDialog from "./AdminDialog";
import IframeDialog from "./IframeDialog";

const CustomDialog = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const { open, type } = useSelector((state) => state.iphone.modal);

	const handleClose = () => {
		dispatch(actions.closeDialog());
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={handleClose}
			maxWidth="lg"
		>
			{open &&
				(type === "admin" ? (
					<AdminDialog fullScreen={fullScreen} />
				) : (
					<IframeDialog fullScreen={fullScreen} />
				))}
		</Dialog>
	);
};

export default CustomDialog;
