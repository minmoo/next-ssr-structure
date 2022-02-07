import { Avatar, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { COMPONENT_HEIGHT, GAP } from "@lib/constants/base";
import Image from "next/image";
import WidgetBase from "@components/mui/grid/WidgetBase";
import { blueGrey, deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "@lib/api";
import { useExperiences } from "@lib/query/portfolio/experience";

function CustomizedTimeline() {
	const {
		isLoading,
		error,
		data: experiences,
	} = useExperiences({
		staleTime: 1000 * 60,
	});
	const experienceSize = experiences.length;
	console.log(experiences);

	return (
		<Timeline position="alternate">
			{!isLoading &&
				experiences.map((item, idx) => (
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
	return (
		<WidgetBase
			title="Experience"
			subTitle="subtitle"
			primaryColor={deepPurple[700]}
			secondaryColor={deepPurple[400]}
			sx={{ height: `${COMPONENT_HEIGHT.EXPERIENCE}px`, mt: `${GAP}px` }}
		>
			<CustomizedTimeline />
		</WidgetBase>
	);
};

export default Experience;
