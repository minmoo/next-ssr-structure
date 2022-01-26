import { Box, Icon } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SquareIcon from "@mui/icons-material/SquareRounded";
import LooksIcon from "@mui/icons-material/LooksRounded";
import SvgIcon from "@mui/material/SvgIcon";

const Iphone = () => {
	const fingerRef = useRef(null);
	const phoneRef = useRef(null);

	const lockRef = useRef(null);
	useEffect(() => {
		document.addEventListener("scroll", animateScroll);
	}, []);

	const animateScroll = () => {
		//0~200까지 손 움직인다.
		console.log(window.scrollY);
		const offset = window.scrollY;
		if (offset <= 200) {
			const currentOffset = window.scrollY / 20;
			fingerRef.current.style.transform = `translate(-35%,-${currentOffset}vh)`;
		} else {
			if (fingerRef.current.style.transform !== "translate(-35%, -10vh)") {
				fingerRef.current.style.transform = `translate(-35%, -10vh)`;
			}
		}

		//200~500까지 화면 확대
		if (offset > 200 && offset <= 500) {
			//가로만 맞추면 된다.
			//센터로 오면서
			// phoneRef.current.style.width = `${30 + window.scrollY / 20}vh`;
		}
	};

	return (
		<Box
			sx={{
				position: "relative",
				height: "300vh",
				transition: "transform 1500ms ease-in-out",
			}}
		>
			<button
				onClick={() => {
					lockRef.current.style.transform =
						"translate(-50%,-50%) rotateY(0.5turn)";
					lockRef.current.style.transformOrigin = "35px 50px";
				}}
			>
				CLick
			</button>

			<button
				onClick={() => {
					lockRef.current.style.transform = "translate(-50%,-50%)";
				}}
			>
				revert
			</button>
			<Box
				sx={{
					"width": "50px",
					"height": "50px",
					"position": "fixed",
					"top": "50px",
					"left": "50%",
					"transform": "translate(-50%,-50%)",
					"transition": "transform 1s ease-in-out",
					"&:hover": {
						transform: "translate(-50%, -50%) rotateY(0.5turn)",
					},
				}}
			>
				<Image
					src="/roundedSquare.png"
					layout="fill"
					width={100}
					height={100}
				/>
			</Box>
			<Box
				sx={{
					"width": "40px",
					"height": "50px",
					"position": "fixed",
					"top": "15px",
					"left": "50%",
					"transform": "translate(-50%,-50%)",
					"transition": "transform 1s ease-in-out",
					"&:hover": {
						transform: "translate(-50%, -50%) rotateY(0.5turn)",
						transformOrigin: "35px 50px",
					},
				}}
				ref={lockRef}
			>
				<Image src="/ring1.png" layout="fill" width={100} height={100} />
			</Box>

			<SquareIcon />
			<LooksIcon color="primary" />
			<Box
				sx={{
					width: "90vw",
					height: "90vh",
					position: "fixed",
					bottom: "0vh",
					left: "50%",
					transform: "translate(-50%, 0%)",
				}}
				ref={phoneRef}
			>
				<Image src="/ipad.png" layout="fill" width={800} height={1000} />
			</Box>
			<Box
				sx={{
					width: "10vh",
					height: "10vh",
					position: "fixed",
					bottom: "-10vh",
					left: "50%",
					transform: "translate(-35%, 0vh)",
				}}
				ref={fingerRef}
			>
				<Image src="/finger.png" layout="responsive" width={100} height={100} />
			</Box>
		</Box>
	);
};

export default Iphone;
