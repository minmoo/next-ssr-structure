import { ArrowDownward } from "@mui/icons-material";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Hori from "./parallax/Hori";
import Iphone from "./parallax/Iphone";
import Test from "./parallax/Test";

type HeroProps = {
	imgSrc: string;
	imgAlt: string;
	title: string;
	subtitle: string;
};
const Hero = ({ imgSrc, imgAlt, title, subtitle }: HeroProps) => {
	return (
		<Paper
			sx={{
				position: "relative",
				height: "300vh",
				width: "100vw",
				maxWidth: "100%", //가로 스크롤바 제거
				zIndex: -100,
				mb: 15,
				overflowX: "hidden",
				// backgroundColor: "blue",
			}}
		>
			{/* <Hori />
			<Test /> */}
			<Grid component="section" container>
				<Iphone />
				{/* <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit="cover" /> */}
				{/* 이미지에 필터를 적용한다 */}
				{/* <Grid
					container
					sx={{
						position: "absolute",
						inset: 0, // IMAGE 컨테이너 전체를 포함한다.
						backgroundColor: "rgba(0,0,0,.7)",
					}}
				> */}
				<Grid
					container
					item
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						variant="h1"
						align="center"
						gutterBottom
						sx={{
							color: "secondary.main",
							fontWeight: 400,
						}}
					>
						{title}
					</Typography>
					<Typography
						component="p"
						variant="h3"
						align="center"
						color="common.white"
						sx={{
							mb: 10,
						}}
					>
						{subtitle}
					</Typography>

					{/* 100vh로 디바이스 전체를 이미지로 덮었기 때문에 
          스크롤이 가능한지 알려줘야한다 (특히 모바일 환경) */}
					<Typography component="p" variant="h6" color="secondary" gutterBottom>
						Scroll
					</Typography>
					<ArrowDownward fontSize="large" color="secondary" />
				</Grid>
			</Grid>
			{/* </Grid> */}
		</Paper>
	);
};

export default Hero;
