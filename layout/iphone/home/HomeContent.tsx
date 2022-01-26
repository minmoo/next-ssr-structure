import { Box, Grid, Paper, Zoom } from "@mui/material";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import Experience from "@components/portfolio/Experience";
import Project from "@components/portfolio/Project";
import Skill2 from "@components/portfolio/Skill";
import Tools from "@components/portfolio/Tools";

const DummyPortal = ({ height }: { height: string }) => {
	return ReactDOM.createPortal(
		<Box sx={{ height: { height }, width: "100px" }} />,
		document.getElementById("dummy") ?? document.body,
	);
};

const MainContent = (): JSX.Element => {
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

	const handleResize = () => {
		// 300(페이지 넘기기) + 200(project 넘기기)
		if (contentRef.current) {
			setHeight(`${contentRef.current.clientHeight + 300 + 200}px`);
		}
	};

	const handleScroll = () => {
		const offset = window.scrollY;
		//300~800 까지는 페이지 내리기(SKILL 영역의 높이 만큼)
		if (contentRef.current) {
			if (offset < 300) {
				setFade(false);
				contentRef.current.style.transform = "translate(-50%, 0)";
			} else if (offset >= 300 && offset < 800) {
				setFade(true);
				const contentOffset = offset - 300;
				contentRef.current.style.transform = `translate(-50%, -${contentOffset}px)`;
			} else {
				contentRef.current.style.transform = `translate(-50%, -500px)`;
			}

			// 1000 이상 부터 페이지 업
			if (offset >= 1000) {
				const contentOffset = offset - 500; //300(기본시작) + 200(슬라이드) 값
				contentRef.current.style.transform = `translate(-50%,-${contentOffset}px)`;
			}
		}
	};

	return (
		<Paper
			sx={{
				position: "absolute",
				top: "0",
				left: "50%",
				// transform: "translate(-50%, 0)",
				background: "rgba(0, 0, 0, 0)", //child를 제외하고 parent만 투명효과를 주기위해 사용
				p: "0 15px",
				width: "100%",
				minHeight: "560px",
			}}
			style={{ transform: "translate(-50%, 0)" }}
			ref={contentRef}
		>
			{showPortal && <DummyPortal height={portalHeight} />}
			<Zoom in={fade} style={{ transitionDelay: fade ? "100ms" : "0ms" }}>
				<Grid component="section" container pt="30px">
					{/* PAGE HEADER */}
					{/* <Grid
									item
									container
									flexDirection="row"
									justifyContent="flex-end"
									alignItems="center"
									spacing="3vw"
									height="5vh"
									minHeight={MIN_ONE_VH * 5}
								>
									<Grid item>
										<WifiIcon fontSize="medium" sx={{ color: "white" }} />
									</Grid>

									<Grid item>
										<Box sx={{ pr: "2vw" }}>
											<Image src="/battery.png" height={20} width={50} />
										</Box>
									</Grid>
								</Grid> */}

					{/* 모든 항목들은 MIN HEIGHT 가 560PX - 위아래 패딩(30 + 30 ) -> 500PX */}
					{/* 시작일 경우에만 스크롤 여유 공간으로 100PX 씩 준다 */}
					{/* 각 항목마다 50PX 씩 여유공간 */}
					{/* Experience 고정 500px height*/}
					{/* <Experience /> */}

					{/* PROJECT */}
					<Project />
					{/* SKILL */}
					<Skill2 />

					{/* Tools */}
					<Tools />
				</Grid>
			</Zoom>
		</Paper>
	);
};

export default MainContent;
