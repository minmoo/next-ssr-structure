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
	Typography,
} from "@mui/material";
import ParallaxWrapper, {
	ParallaxWrapProps,
} from "@/components/common/Parallax";
import { TProject } from "@/lib/data/portfolio";
import { PARALLAX } from "@/lib/constants/base";
import WidgetBase from "@/components/mui/widget/WidgetBase";
import { brown } from "@mui/material/colors";
import { useProjects } from "@/lib/query/portfolio/project";
import { useShowDialog } from "@/store/iphone/hooks";
import { motion } from "framer-motion";

interface SliderProps extends ParallaxWrapProps {
	projects: TProject[];
}

const Slider = ({ callbackRef, projects = [] }: SliderProps) => {
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
				transitionDuration: "300ms",
			}}
			style={{ transform: "translate(0, -50%)" }}
			ref={callbackRef}
		>
			{projects.map((project, idx) => (
				<Card
					// component={motion.div}
					// whileHover={{ backgroundColor: "red", transition: { duration: 5 } }}
					sx={{
						"position": "absolute",
						"top": 0,
						"left": `${idx * 70 + 20}%`,
						"width": "60%",
						"height": "100%",
						"willChange": "transform",
						"transform": "translate3d(0,0,0)",
						"overflow": "visible",
						"borderRadius": "20px",
						"boxShadow": 5,
						"transition": "background 1s",
						"background": "white",
						"&:hover": {
							background: "linear-gradient(blue, pink);",
						},
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
								boxShadow: 5,
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

const list = {
	visible: {
		opacity: 1,
		transition: {
			delay: 0.8,
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
};

const Project = () => {
	const onShowDialog = useShowDialog();
	const {
		isLoading,
		error,
		data: projects,
		queryKey,
	} = useProjects({
		staleTime: 1000 * 60,
	});
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
			onAdminEdit={() => {
				onShowDialog({
					open: true,
					title: "Project",
					queryKey: queryKey,
				});
			}}
		>
			{!isLoading && (
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={list}
					style={{ overflow: "hidden", height: "100%" }}
				>
					<PxSlider projects={projects} />
				</motion.div>
			)}
		</WidgetBase>
	);
};

export default Project;
