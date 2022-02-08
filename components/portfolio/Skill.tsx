import { styled } from "@mui/material/styles";
import {
	Avatar,
	Box,
	LinearProgress,
	LinearProgressProps,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import portfolio, { TSkill } from "@lib/data/portfolio";
import WidgetMulti from "@components/mui/widget/WidgetMulti";
import { blueGrey, grey, indigo, lightGreen, lime } from "@mui/material/colors";
import { useSkills } from "@lib/query/portfolio/skill";
import { ModelSkill } from "@models/skill";

const LinearProgressWithLabel = (
	props: LinearProgressProps & { value: number },
) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "90%", mr: 1 }}>
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

const Skill = () => {
	const {
		isLoading,
		error,
		data: skills,
	} = useSkills({
		staleTime: 1000 * 60,
	});
	const categorySkill =
		skills?.reduce((acc, val) => {
			if (val.category in acc) {
				acc[val.category].push(val);
			} else {
				acc[val.category] = [val];
			}
			return acc;
		}, {} as { [index: string]: Array<ModelSkill> }) ?? {};

	if (isLoading) {
		return <></>;
	}

	return (
		<WidgetMulti
			title="My Skills"
			primaryColor={blueGrey[700]}
			secondaryColor={blueGrey[400]}
			items={Object.entries(categorySkill).map(([key, value]) => (
				<Box
					sx={{
						borderRadius: "20px",
						bgcolor: blueGrey[200],
						p: "10px",
					}}
					key={key}
				>
					<Typography variant="h6" component="div" color="chocolate">
						{key}
					</Typography>

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
				</Box>
			))}
		/>
	);
};

export default Skill;
