import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import ParallaxWrapper, {
	ParallaxWrapProps,
} from "@components/common/Parallax";
import portfolio, { TProject } from "@lib/data/portfolio";
import { PARALLAX } from "@lib/constants/base";
import WidgetBase from "@components/mui/grid/WidgetBase";
import { brown } from "@mui/material/colors";

interface SliderProps extends ParallaxWrapProps {
	projects: TProject[];
}

const Slider = ({ callbackRef, projects }: SliderProps) => {
	return (
		<Box //slider
			sx={{
				position: "relative",
				top: "50%",
				width: "100%",
				height: "380px",
				cursor: "all-scroll",
				userSelect: "none",
				mt: "10px",
			}}
			style={{ transform: "translate(0, -50%)" }}
			ref={callbackRef}
		>
			{projects.map((project, idx) => (
				<Card
					sx={{
						position: "absolute",
						top: 0,
						left: `${idx * 70 + 20}%`,
						width: "60%",
						height: "100%",
						willChange: "transform",
						transform: "translate3d(0,0,0)",
						overflow: "visible",
						borderRadius: "20px",
					}}
					key={project.title}
				>
					<CardActionArea>
						<CardMedia
							component="img"
							height="200"
							image={project.image}
							alt="green iguana"
							sx={{
								position: "relative",
								width: "90%",
								bottom: "20px",
								left: "50%",
								transform: "translate(-50%, 0)",
								borderRadius: "20px",
							}}
						/>
						<CardContent
							sx={{ pt: "0px", height: "130px", overflow: "hidden" }}
						>
							<Typography gutterBottom variant="h5" component="div">
								{project.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{project.desc}
							</Typography>
						</CardContent>

						<Divider variant="middle" />
						<CardActions>
							{project.skills.map((skill, idx) => (
								<Chip
									key={idx}
									label={skill}
									avatar={
										<Avatar src={`/icon/${skill}.png`} variant="square" />
									}
								/>
							))}
						</CardActions>
					</CardActionArea>
				</Card>
			))}
		</Box>
	);
};

const Project = () => {
	const projects = portfolio.projects;
	const PxSlider = ParallaxWrapper(
		Slider,
		"right",
		PARALLAX.PROJECT_SLIDER[0],
		PARALLAX.PROJECT_SLIDER[1],
		"0.7%",
	); // 카드의 넓이가 60%이기때문에 60% + 10%(공백)씩 이동

	return (
		<WidgetBase
			title="Project"
			subTitle="subtitle"
			primaryColor={brown[700]}
			secondaryColor={brown[400]}
			sx={{ height: "500px" }}
		>
			<div style={{ overflow: "hidden", height: "100%" }}>
				<PxSlider projects={projects} />
			</div>
		</WidgetBase>
	);
};

export default Project;
