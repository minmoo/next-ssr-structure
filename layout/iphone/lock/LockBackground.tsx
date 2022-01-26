import { Box, Paper } from "@mui/material";
import Image from "next/image";
import WifiIcon from "@mui/icons-material/Wifi";
import { ParallaxWrapProps } from "../../../components/common/Parallax";
import { useEffect, useRef } from "react";

const LockBackground = ({ callbackRef }: ParallaxWrapProps) => {
	const bgRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		//100~300까지 filter 적용
		const offset = window.scrollY;
		if (bgRef.current) {
			if (offset < 100) {
				bgRef.current.style.filter = "blur(0)";
			} else if (offset >= 100 && offset < 300) {
				const filterOffset = (offset - 100) / 40;
				bgRef.current.style.filter = `blur(${filterOffset}px)`;
			} else {
				bgRef.current.style.filter = `blur(5px)`;
			}
		}
	};

	return (
		<Paper //blur효과를 child 빼고 주기 위해서 사용
			sx={{
				// Paper들의 기본 가운데 정렬을 위해서
				position: "absolute",
				top: "0",
				left: "50%",
				p: "0 30px",
				height: "100vh",
				width: "100%",
				minHeight: "560px",
				willChange: "transform",
				transition: "transform 300ms ease-in-out",
			}}
			style={{ transform: "translate(-50%, 0)" }}
			ref={(element) => {
				bgRef.current = element;
				callbackRef(element);
			}}
		>
			<Image src="/bg.jpg" layout="fill" objectFit="cover" />
			<Box sx={{ position: "absolute", top: "5px", right: "100px" }}>
				<WifiIcon fontSize="medium" sx={{ color: "white" }} />
			</Box>

			<Box sx={{ position: "absolute", top: "5px", right: "35px" }}>
				<Image src="/battery.png" height={20} width={50} />
			</Box>
		</Paper>
	);
};

export default LockBackground;
