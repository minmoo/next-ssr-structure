import { Box } from "@mui/material";
import Image from "next/image";
import WifiIcon from "@mui/icons-material/Wifi";
import IphonePaper from "../common/IphonePaper";
import homeBackgroundImage from "@/public/bg4.jpg";

const HomeBackground = () => {
	return (
		<IphonePaper full src={homeBackgroundImage}>
			<Box sx={{ position: "absolute", top: "5px", right: "100px" }}>
				<WifiIcon fontSize="medium" sx={{ color: "white" }} />
			</Box>

			<Box sx={{ position: "absolute", top: "5px", right: "35px" }}>
				<Image src="/battery.png" height={20} width={50} />
			</Box>
		</IphonePaper>
	);
};

export default HomeBackground;
