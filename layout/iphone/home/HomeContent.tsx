import { Box, Grid, Slide } from "@mui/material";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import Experience from "@/components/portfolio/experience";
import Project from "@/components/portfolio/Project";
import Skill from "@/components/portfolio/skill";
import Tools from "@/components/portfolio/tool";
import IphonePaper from "../common/IphonePaper";
import { COMPONENT_HEIGHT, GAP, PARALLAX } from "@/lib/constants/base";
import Contact from "@/components/portfolio/Contact";
import useResizeObserver from "@/lib/hooks/useResizeObserver";

/**
 * Parallax의 전체 페이지 스크롤을 만들어주기 위해 사용
 */
const DummyPortal = ({ height }: { height: string }) => {
	return ReactDOM.createPortal(
		<Box
			sx={{ height: { height }, width: "100%", backgroundColor: "black" }}
		/>,
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
		//scroll 맨위로 이동
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 500);
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
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

	useResizeObserver(contentRef, () => {
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
	});

	const handleScroll = () => {
		const offset = window.scrollY;

		if (contentRef.current) {
			if (offset < PARALLAX.LOCK_PAPER[1]) {
				setFade(false);
				contentRef.current.style.transform = "translate(-50%, 0)";
			} else if (
				offset >= PARALLAX.LOCK_PAPER[1] &&
				offset < PARALLAX.PROJECT_SLIDER[0]
			) {
				setFade(true);
				const contentOffset = offset - PARALLAX.LOCK_PAPER[1];
				contentRef.current.style.transform = `translate(-50%, -${contentOffset}px)`;
			} else {
				contentRef.current.style.transform = `translate(-50%, -${
					COMPONENT_HEIGHT.EXPERIENCE + GAP + GAP / 2
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
		<IphonePaper
			ref={contentRef}
			transparent
			sx={{ p: "0 25px", overflow: "hidden" }}
		>
			{showPortal && <DummyPortal height={portalHeight} />}
			<Slide direction="right" in={fade} timeout={{ enter: 700, exit: 200 }}>
				<Grid
					component="section"
					container
					pt="30px"
					gap={`${GAP}px`}
					direction="column"
				>
					{/* 모든 항목들은 MIN HEIGHT 가 560PX - 위아래 패딩(30 + 30 ) -> 500PX */}
					{/* 시작일 경우에만 스크롤 여유 공간으로 100PX 씩 준다 */}
					{/* 각 항목마다 100PX 씩 여유공간 */}
					<Experience />

					<Project />

					<Skill />

					<Tools />

					<Contact />
				</Grid>
			</Slide>
		</IphonePaper>
	);
};

export default HomeContent;
