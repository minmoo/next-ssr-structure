import { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Paper } from "@mui/material";
const ParallaxHero = () => {
	const parallaxRef = useRef<IParallax>(null);

	return (
		<Paper
			sx={{
				position: "relative",
				height: "100%",
				width: "100vw",
				maxWidth: "100%",
			}}
		>
			<Parallax ref={parallaxRef} pages={3}></Parallax>
		</Paper>
	);
};

export default ParallaxHero;
