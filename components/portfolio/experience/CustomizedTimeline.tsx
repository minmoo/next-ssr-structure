import { Avatar, Button, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { ModelExperience } from "@/models/experience";
import { motion } from "framer-motion";
const list = {
	visible: {
		opacity: 1,
		transition: {
			delay: 0.3,
			when: "beforeChildren",
			staggerChildren: 0.2,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
};

const itemVariants = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: -100 },
};

function CustomizedTimeline({
	experiences = [],
}: {
	experiences: ModelExperience[];
}) {
	const experienceSize = experiences?.length ?? 0;

	return (
		<motion.div initial="hidden" whileInView="visible" variants={list}>
			<Timeline position="alternate">
				{experiences?.map((item, idx) => (
					<motion.div key={item.role} variants={itemVariants}>
						<TimelineItem
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
								<TimelineConnector sx={{ bgcolor: "secondary.light" }} />
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
								<TimelineConnector sx={{ bgcolor: "secondary.light" }} />
							</TimelineSeparator>
							<TimelineContent sx={{ py: "12px", px: 2 }}>
								<Typography variant="h6" component="span" color="secondary">
									{item.company}
								</Typography>
								<Typography color="text.primary">{item.role}</Typography>
							</TimelineContent>
						</TimelineItem>
					</motion.div>
				))}
			</Timeline>
		</motion.div>
	);
}

export default CustomizedTimeline;
