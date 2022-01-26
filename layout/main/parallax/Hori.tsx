import { Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";

const Hori = () => {
	const sliderRef = useRef(null);
	const pagenation = (direction) => {
		if (direction === 0) {
			sliderRef.current.style.transform = `translate3d(-100%, 0, 0)`;
		} else {
			sliderRef.current.style.transform = `translate3d(0, 0, 0)`;
		}
	};

	useEffect(() => {
		document.addEventListener("wheel", (e) => {
			const deltaY = e.deltaY;
			if (deltaY > 0) {
				pagenation(0);
			} else {
				pagenation(1);
			}
		});
	}, []);

	return (
		<>
			<Button onClick={() => pagenation(0)}>click</Button>
			<Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
				<Box //slider
					sx={{
						position: "relative",
						height: "100%",
						transform: "translate3d(0,0,0)",
						willChange: "transform",
						cursor: "all-scroll",
						userSelect: "none",
						transition: "transform 750ms ease-in-out",
					}}
					ref={sliderRef}
				>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							width: "100%",
							height: "100%",
							overflow: "hidden",
							left: "0%", // 동적으로 해줘야한다.
							willChange: "transform",
							transform: "translate3d(0,0,0)",
							background: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--1-min-min.jpg') center center no-repeat`,
							backgroundSize: "cover",
							backgroundPosition: "0px center, 0px center",
						}}
					></Box>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							width: "100%",
							height: "100%",
							overflow: "hidden",
							left: "100%",
							willChange: "transform",
							transform: "translate3d(0,0,0)",
							background: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city--2-min-min.jpg') center center no-repeat`,
							backgroundSize: "cover",
							backgroundPosition: "0px center, 0px center",
						}}
					></Box>
				</Box>
			</Box>
		</>
	);
};

export default Hori;
