import { useSelector } from "@/store";
import { actions } from "@/store/iphone";
import {
	Box,
	Button,
	Card,
	CardMedia,
	CircularProgress,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

const IframeDialog = ({ fullScreen }: { fullScreen: boolean }) => {
	const dispatch = useDispatch();
	const { title, options = {} } = useSelector((state) => state.iphone.modal);
	const [loading, setLoading] = useState<boolean>(true);

	const handleLoad = () => {
		setLoading(false);
	};

	const handleClose = () => {
		dispatch(actions.closeDialog());
	};

	return (
		<>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Card sx={{ position: "relative" }}>
					{loading && (
						<Box
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-20px, -20px)",
								width: fullScreen ? "90vw" : "50vw",
								height: fullScreen ? "90vh" : "60vh",
								minHeight: "400px",
							}}
						>
							<CircularProgress />
						</Box>
					)}
					<CardMedia
						component="iframe"
						src={options.src}
						sx={
							fullScreen
								? { height: "90vh", width: "90vw" }
								: { height: "60vh", width: "50vw", minHeight: "400px" }
						}
						onLoad={handleLoad}
					/>
				</Card>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</>
	);
};

export default IframeDialog;
