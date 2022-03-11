import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "@/store";
import AdminDialog from "./AdminDialog";
import IframeDialog from "./IframeDialog";
import AuthDialog from "./AuthDialog";
import { useCloseDialog } from "@/store/iphone/hooks";

const CustomDialog = () => {
	const theme = useTheme();
	const onCloseDialog = useCloseDialog();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const { open, type } = useSelector((state) => state.iphone.modal);

	const handleClose = () => {
		onCloseDialog();
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={handleClose}
			maxWidth="lg"
			PaperProps={{ sx: { borderRadius: "20px" } }}
		>
			{open &&
				{
					admin: <AdminDialog fullScreen={fullScreen} />,
					iframe: <IframeDialog fullScreen={fullScreen} />,
					auth: <AuthDialog fullScreen={fullScreen} />,
				}[type]}
		</Dialog>
	);
};

export default CustomDialog;
