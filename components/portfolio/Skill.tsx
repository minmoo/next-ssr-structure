import { styled } from "@mui/material/styles";
import {
	Avatar,
	Box,
	Grid,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import { useState } from "react";
import portfolio, { TSkill } from "@lib/data/portfolio";

const SkillPaper = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

const LinearProgressWithLabel = (props) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="buffer" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="black">{`${Math.round(
					props.value,
				)}`}</Typography>
			</Box>
		</Box>
	);
};

const Skill2 = () => {
	const [percent, setPercent] = useState(0);

	const categorySkill = portfolio.skills.reduce((acc, val) => {
		if (val.category in acc) {
			acc[val.category].push(val);
		} else {
			acc[val.category] = [val];
		}
		return acc;
	}, {} as { [index: string]: Array<TSkill> });

	return (
		<Grid container spacing={2}>
			<Grid item md={12}>
				<Typography variant="h2">My Skills</Typography>
			</Grid>
			{Object.entries(categorySkill).map(([key, value]) => (
				<Grid item md={6} xs={12} key={key}>
					<Typography
						variant="h6"
						component="div"
						onClick={() => setPercent(70)}
						onDoubleClick={() => setPercent(0)}
					>
						{key}
					</Typography>
					<SkillPaper>
						<List dense>
							{value.map((skill) => (
								<ListItem key={skill.icon}>
									<ListItemAvatar>
										<Avatar src={skill.icon} variant="square" />
									</ListItemAvatar>
									<ListItemText
										primary={
											<LinearProgressWithLabel
												value={skill.proficient}
												valueBuffer={0}
												color="success"
											/>
										}
										secondary={skill.title}
										secondaryTypographyProps={{ color: "black" }}
									/>
								</ListItem>
							))}
						</List>
					</SkillPaper>
				</Grid>
			))}
		</Grid>
	);
};

export default Skill2;
