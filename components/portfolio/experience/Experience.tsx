import { COMPONENT_HEIGHT, GAP } from "@/lib/constants/base";
import WidgetBase from "@/components/mui/widget/WidgetBase";
import { deepPurple } from "@mui/material/colors";
import { useExperiences } from "@/lib/query/portfolio/experience";
import { useShowDialog } from "@/store/iphone/hooks";
import CustomizedTimeline from "./CustomizedTimeline";

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
		</WidgetBase>
	);
};

export default Experience;
