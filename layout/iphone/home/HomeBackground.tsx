import { Box, Paper } from "@mui/material";
import Image from "next/image";
import WifiIcon from "@mui/icons-material/Wifi";

const MainBackground = () => {
	return (
		<Paper
			sx={{
				// Paper들의 기본 가운데 정렬을 위해서
				position: "absolute",
				top: "0",
				left: "50%",
				transform: "translate(-50%, 0)",

				p: "0 30px",
				height: "100vh",
				width: "100%",
				minHeight: "560px",
				willChange: "transform",
				transition: "transform 500ms ease-in-out",
			}}
		>
			<Image src="/bg4.jpg" layout="fill" objectFit="cover" />
			<Box sx={{ position: "absolute", top: "5px", right: "100px" }}>
				<WifiIcon fontSize="medium" sx={{ color: "white" }} />
			</Box>

			<Box sx={{ position: "absolute", top: "5px", right: "35px" }}>
				<Image src="/battery.png" height={20} width={50} />
			</Box>
		</Paper>
	);
};

export default MainBackground;
