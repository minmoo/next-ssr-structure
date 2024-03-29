import { Box, List, Typography } from "@mui/material";
import WidgetMulti from "@/components/mui/widget/WidgetMulti";
import { blueGrey, grey, indigo, lightGreen, lime } from "@mui/material/colors";
import { useSkills } from "@/lib/query/portfolio/skill";
import { ModelSkill } from "@/models/skill";
import { useShowDialog } from "@/store/iphone/hooks";
import ItemSkill from "./ItemSkill";
import { AnimateSharedLayout } from "framer-motion";

const Skill = () => {
	const onShowDialog = useShowDialog();
	const {
		isLoading,
		error,
		data: skills,
		queryKey,
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
			itemMargin
			onAdminEdit={() => {
				onShowDialog({
					type: "admin",
					open: true,
					title: "Skill",
					options: { queryKey },
				});
			}}
			items={Object.entries(categorySkill).map(([key, value]) => (
				<Box
					sx={{
						borderRadius: "20px",
						bgcolor: blueGrey[200],
						p: "10px",
						boxShadow: 5,
					}}
					key={key}
				>
					<Typography variant="h6" component="div" color="chocolate">
						{key}
					</Typography>

					<List dense>
						<AnimateSharedLayout>
							{value.map((skill, idx) => (
								<ItemSkill key={idx} skill={skill} />
							))}
						</AnimateSharedLayout>
					</List>
				</Box>
			))}
		/>
	);
};

export default Skill;
