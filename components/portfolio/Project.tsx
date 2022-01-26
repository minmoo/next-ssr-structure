import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import ParallaxWrapper, {
	ParallaxWrapProps,
} from "@components/common/Parallax";

const Slider = ({ callbackRef }: ParallaxWrapProps) => {
	return (
		<Box //slider
			sx={{
				position: "relative",
				width: "100%",
				height: "400px",
				cursor: "all-scroll",
				userSelect: "none",
			}}
			ref={callbackRef}
		>
			<Card
				sx={{
					position: "absolute",
					top: 0,
					left: "20%",
					width: "60%",
					height: "100%",
					willChange: "transform",
					transform: "translate3d(0,0,0)",
					overflow: "visible",
				}}
			>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image="/bg.jpg"
						alt="green iguana"
						sx={{
							position: "relative",
							width: "90%",
							bottom: "20px",
							left: "50%",
							transform: "translate(-50%, 0)",
							borderRadius: "4px",
						}}
					/>
					<CardContent sx={{ pt: "0px", height: "150px", overflow: "hidden" }}>
						<Typography gutterBottom variant="h5" component="div">
							Lizard
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Lizards
						</Typography>
					</CardContent>

					<Divider variant="middle" />
					<CardContent>
						<Typography>Skill Icon 넣기</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card
				sx={{
					position: "absolute",
					top: 0,
					left: "90%",
					width: "60%",
					height: "100%",
					willChange: "transform",
					transform: "translate3d(0,0,0)",
					overflow: "visible",
				}}
			>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image="/bg.jpg"
						alt="green iguana"
						sx={{
							position: "relative",
							width: "90%",
							bottom: "20px",
							left: "50%",
							transform: "translate(-50%, 0)",
							borderRadius: "4px",
						}}
					/>
					<CardContent sx={{ pt: "0px", height: "150px", overflow: "hidden" }}>
						<Typography gutterBottom variant="h5" component="div">
							Lizard
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Lizards are a widespread group of squamate reptiles, with over
							6,000 species, ranging across all continents except Antarctica
						</Typography>
					</CardContent>

					<Divider variant="middle" />
					<CardContent>
						<Typography>Skill Icon 넣기</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card
				sx={{
					position: "absolute",
					top: 0,
					left: "160%",
					width: "60%",
					height: "100%",
					willChange: "transform",
					transform: "translate3d(0,0,0)",
					overflow: "visible",
				}}
			>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image="/bg.jpg"
						alt="green iguana"
						sx={{
							position: "relative",
							width: "90%",
							bottom: "20px",
							left: "50%",
							transform: "translate(-50%, 0)",
							borderRadius: "4px",
						}}
					/>
					<CardContent sx={{ pt: "0px", height: "150px", overflow: "hidden" }}>
						<Typography gutterBottom variant="h5" component="div">
							Lizard
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Lizards are a widespread group of squamate reptiles, with over
							6,000 species, ranging across all continents except Antarctica
							Lizards are a widespread group of squamate reptiles, with over
							6,000 species, ranging across all continents except Antarctica
						</Typography>
					</CardContent>

					<Divider variant="middle" />
					<CardContent>
						<Typography>Skill Icon 넣기</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
};

const PxSlider = ParallaxWrapper(Slider, "right", 800, 1000, "0.7%"); // 카드의 넓이가 60%이기때문에 60% + 10%(공백)씩 이동
const Project = () => {
	return (
		<Grid container direction="row" sx={{ height: "500px" }}>
			<Grid item lg={4}>
				<Typography variant="h1">PROJECT</Typography>
			</Grid>

			<Grid
				item
				lg={8}
				sx={{ flexBasis: "100%", overflow: "hidden", pt: "20px" }}
			>
				<PxSlider />
			</Grid>
		</Grid>
	);
};

export default Project;
