import { Box } from "@mui/material";
import Image from "next/image";
import ParallaxWrapper from "./ParallaxWrapper";

const Test = () => {
	const Orb = ParallaxWrapper(
		<Box
			sx={{
				width: "200px",
				height: "200px",
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<Image src={"/laptop.png"} layout="fill" objectFit="cover"></Image>
		</Box>,
		0.05,
	);
	return (
		<div>
			<Orb></Orb>
		</div>
	);
};

export default Test;
