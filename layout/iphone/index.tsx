import { Box, Container } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import { MIN_PAPER_HEIGHT } from "@/lib/constants/base";
const OutSideRoundIcon = createSvgIcon(
	<path d="M0 0 L 0 24 L 24 24 Q 0 24 0 0" />,
	"OutSideRound",
);

const Iphone = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box sx={{ backgroundColor: "black" }}>
			{/* MIN 320px 560px 기준 (SE 제일 작은 디바이스 기준) */}
			{/* MAX 1500px */}
			{/* FIXED PAGE */}
			<Container
				maxWidth="xl"
				sx={{
					position: "fixed",
					top: "0",
					left: "50%",
					transform: "translate(-50%,0)",
					width: "100%",
					height: "100vh",
					minHeight: MIN_PAPER_HEIGHT,
				}}
			>
				{/* Container에 padding이 있는데 child Paper에서 position absolute로 
          동작할 경우 패딩을 포함하지 않는다. 그래서 div로 패딩 없는 영역 relative로 설정 */}
				<Box sx={{ position: "relative", width: "100%", height: "100%" }}>
					{children}

					{/* LAYOUT SVG */}
					{/* NOTCH header */}
					<Box
						sx={{
							backgroundColor: "black",
							position: "absolute",
							left: "50%",
							top: "0",
							width: "20vw",
							minWidth: "180px",
							height: "30px", //mobile notch 영역이라 관리해야한다.
							transform: "translate(-50%, 0)",
							borderRadius: "0 0 20px 20px",
						}}
					></Box>
					<Box
						sx={{
							position: "absolute",
							top: 0,
						}}
					>
						<OutSideRoundIcon
							sx={{
								fontSize: "32px",
								transform: "rotate(0.25turn)",
							}}
						/>
					</Box>

					<Box
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
							paddingRight: "inherit",
						}}
					>
						<OutSideRoundIcon
							sx={{ fontSize: "32px", transform: "rotate(0.5turn)" }}
						/>
					</Box>

					<Box
						sx={{
							position: "absolute",
							bottom: 0,
							height: "32px",
						}}
					>
						<OutSideRoundIcon sx={{ fontSize: "32px" }} />
					</Box>
					<Box
						sx={{
							position: "absolute",
							bottom: 0,
							right: 0,
							paddingRight: "inherit",
							textAlign: "end",
							height: "32px",
						}}
					>
						<OutSideRoundIcon
							sx={{
								fontSize: "32px",
								transform: "rotate(0.75turn)",
							}}
						/>
					</Box>
				</Box>
			</Container>
			{/* DUMMY 스크롤용으로 만들어야한다. */}
			<Box id="dummy" sx={{ height: "100vh" }}></Box>
		</Box>
	);
};

export default Iphone;
