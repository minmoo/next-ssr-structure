import { Avatar, Button, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { COMPONENT_HEIGHT, GAP } from "@/lib/constants/base";
import Image from "next/image";
import WidgetBase from "@/components/mui/widget/WidgetBase";
import { blueGrey, deepPurple } from "@mui/material/colors";
import { useExperiences } from "@/lib/query/portfolio/experience";
import { useSelector } from "@/store";
import { actions } from "@/store/iphone";
import { useDispatch } from "react-redux";
import { ModelExperience } from "@/models/experience";
import { useShowDialog } from "@/store/iphone/hooks";

function CustomizedTimeline({
	experiences = [],
}: {
	experiences: ModelExperience[];
}) {
	const experienceSize = experiences?.length ?? 0;

	return (
		<Timeline position="alternate">
			{experiences?.map((item, idx) => (
				<TimelineItem
					key={item.role}
					sx={{
						minHeight: {
							lg: `${450 / experienceSize}px`,
							md: `${400 / experienceSize}px`,
						},
					}}
				>
					<TimelineOppositeContent
						sx={{ m: "auto 0" }}
						align={idx % 2 === 0 ? "right" : "left"}
						variant="body2"
						color="white"
					>
						{`${item.period[0]} ~ ${item.period[1]}`}
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineConnector sx={{ bgcolor: "primary.main" }} />
						<Avatar
							src={item.image}
							variant="rounded"
							sx={{
								width: {
									lg: `${((450 / experienceSize) * 2) / 3}px`,
									md: `${((370 / experienceSize) * 2) / 3}px`,
								},
								height: {
									lg: `${((450 / experienceSize) * 2) / 3}px`,
									md: `${((370 / experienceSize) * 2) / 3}px`,
								},
								my: "10px",
							}}
						/>
						<TimelineConnector sx={{ bgcolor: "primary.main" }} />
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography variant="h6" component="span" color="secondary">
							{item.company}
						</Typography>
						<Typography color="text.primary">{item.role}</Typography>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}

const Experience = () => {
	const onShowDialog = useShowDialog();
	const {
		isLoading,
		error,
		data: experiences,
		queryKey,
	} = useExperiences({
		staleTime: 1000 * 60,
	});

	return (
		<WidgetBase
			title="Experience"
			subTitle="subtitle"
			primaryColor={deepPurple[700]}
			secondaryColor={deepPurple[400]}
			onAdminEdit={() => {
				onShowDialog({
					open: true,
					title: "Experience",
					queryKey: queryKey,
				});
			}}
			sx={{ height: `${COMPONENT_HEIGHT.EXPERIENCE}px`, mt: `${GAP}px` }}
		>
			{experiences && <CustomizedTimeline experiences={experiences} />}
			<Button>Add</Button>
		</WidgetBase>
	);
};

export default Experience;
