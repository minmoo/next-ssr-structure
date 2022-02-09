import { Box } from "@mui/material";
import Image from "next/image";
import WifiIcon from "@mui/icons-material/Wifi";
import { ParallaxWrapProps } from "../../../components/common/Parallax";
import { useEffect, useRef } from "react";
import IphonePaper from "../common/IphonePaper";
import { PARALLAX } from "@/lib/constants/base";
import lockBackgroundImage from "@/public/bg.jpg";
import { useDispatch } from "react-redux";
import { actions } from "store/iphone";

const LockBackground = ({ callbackRef }: ParallaxWrapProps) => {
	const bgRef = useRef<HTMLDivElement | null>(null);
	const dispatch = useDispatch();

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
			if (offset < PARALLAX.LOCK_PAPER[0]) {
				bgRef.current.style.filter = "blur(0)";
			} else if (
				offset >= PARALLAX.LOCK_PAPER[0] &&
				offset < PARALLAX.LOCK_PAPER[1]
			) {
				const filterOffset = (offset - PARALLAX.LOCK_PAPER[0]) / 40;
				bgRef.current.style.filter = `blur(${filterOffset}px)`;
			} else {
				bgRef.current.style.filter = `blur(5px)`;
			}
		}
	};

	return (
		<IphonePaper //blur효과를 child 빼고 주기 위해서 사용
			transitionMs={200}
			full
			ref={(element) => {
				bgRef.current = element;
				callbackRef(element);
			}}
		>
			<Image
				src={lockBackgroundImage}
				layout="fill"
				objectFit="cover"
				priority
				placeholder="blur"
				onLoadingComplete={(e) => {
					dispatch(actions.setLoading(false));
				}}
			/>
			<Box sx={{ position: "absolute", top: "5px", right: "100px" }}>
				<WifiIcon fontSize="medium" sx={{ color: "white" }} />
			</Box>

			<Box sx={{ position: "absolute", top: "5px", right: "35px" }}>
				<Image src="/battery.png" height={20} width={50} />
			</Box>
		</IphonePaper>
	);
};

export default LockBackground;
