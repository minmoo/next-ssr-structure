import IphonePaper from "./IphonePaper";
import AppleIcon from "@mui/icons-material/Apple";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingPaper = () => {
	return (
		<IphonePaper
			full
			sx={{
				backgroundColor: "#1b1b1b",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					top: "45%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<AppleIcon
					sx={{ fontSize: { md: "150px", xs: "100px" }, color: "white" }}
				/>
				<LinearProgress color="primary" />
			</Box>
		</IphonePaper>
	);
};

export default LoadingPaper;
