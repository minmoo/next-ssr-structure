import { Box, Grid, Zoom } from "@mui/material";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import Experience from "@components/portfolio/Experience";
import Project from "@components/portfolio/Project";
import Skill2 from "@components/portfolio/Skill";
import Tools from "@components/portfolio/Tools";
import IphonePaper from "../common/IphonePaper";
import { COMPONENT_HEIGHT, GAP, PARALLAX } from "@lib/constants/base";

/**
 * Parallax의 전체 페이지 스크롤을 만들어주기 위해 사용
 */
const DummyPortal = ({ height }: { height: string }) => {
	return ReactDOM.createPortal(
		<Box sx={{ height: { height }, width: "100px" }} />,
		document.getElementById("dummy") ?? document.body,
	);
};

const HomeContent = (): JSX.Element => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [fade, setFade] = useState(false);
	const [showPortal, setShowPortal] = useState(false);
	const [portalHeight, setHeight] = useState("");

	useEffect(() => {
		setShowPortal(true);
		handleResize();
		window.addEventListener("resize", handleResize);
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (fade) {
			//scroll 막기
			document.body.style.overflow = "hidden";
			setTimeout(() => {
				document.body.style.overflow = "auto";
				window.scrollTo(0, 300);
			}, 200);
		}
	}, [fade]);

	const handleResize = () => {
		// 300(페이지 넘기기) + 200(project 넘기기)
		if (contentRef.current) {
			setHeight(
				`${
					contentRef.current.clientHeight +
					PARALLAX.LOCK_PAPER[1] +
					(PARALLAX.PROJECT_SLIDER[1] - PARALLAX.PROJECT_SLIDER[0])
				}px`,
			);
		}
	};

	const handleScroll = () => {
		const offset = window.scrollY;

		if (contentRef.current) {
			if (offset < PARALLAX.LOCK_PAPER[1]) {
				setFade(false);
				contentRef.current.style.transform = "translate(-50%, 0)";
			} else if (
				offset >= PARALLAX.LOCK_PAPER[1] &&
				offset < PARALLAX.LOCK_PAPER[1] + COMPONENT_HEIGHT.EXPERIENCE + GAP
			) {
				setFade(true);
				const contentOffset = offset - PARALLAX.LOCK_PAPER[1];
				contentRef.current.style.transform = `translate(-50%, -${contentOffset}px)`;
			} else {
				contentRef.current.style.transform = `translate(-50%, -${
					COMPONENT_HEIGHT.EXPERIENCE + GAP
				}px)`;
			}

			if (offset >= PARALLAX.PROJECT_SLIDER[1]) {
				const contentOffset =
					offset -
					(PARALLAX.LOCK_PAPER[1] +
						PARALLAX.PROJECT_SLIDER[1] -
						PARALLAX.PROJECT_SLIDER[0]);
				contentRef.current.style.transform = `translate(-50%,-${contentOffset}px)`;
			}
		}
	};

	return (
		<IphonePaper ref={contentRef} transparent sx={{ p: "0 15px" }}>
			{showPortal && <DummyPortal height={portalHeight} />}
			<Zoom in={fade} style={{ transitionDelay: fade ? "100ms" : "0ms" }}>
				<Grid
					component="section"
					container
					pt="30px"
					gap={`${GAP}px`}
					direction={"column"}
				>
					{/* 모든 항목들은 MIN HEIGHT 가 560PX - 위아래 패딩(30 + 30 ) -> 500PX */}
					{/* 시작일 경우에만 스크롤 여유 공간으로 100PX 씩 준다 */}
					{/* 각 항목마다 100PX 씩 여유공간 */}
					<Experience />

					{/* PROJECT */}
					<Project />
					{/* SKILL */}
					<Skill2 />

					{/* Tools */}
					<Tools />
				</Grid>
			</Zoom>
		</IphonePaper>
	);
};

export default HomeContent;
