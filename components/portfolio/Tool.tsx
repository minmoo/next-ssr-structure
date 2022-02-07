import { Avatar, Box, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import WidgetMulti from "@components/mui/grid/WidgetMulti";
import Image from "next/image";
import { useTools } from "@lib/query/portfolio/tool";
const Tool = () => {
	const {
		isLoading,
		error,
		data: tools,
	} = useTools({
		staleTime: 1000 * 60,
	});

	if (isLoading) {
		return <></>;
	}

	return (
		<WidgetMulti
			title="Tools I Use"
			columnCount={4}
			primaryColor={orange[700]}
			secondaryColor={orange[400]}
			items={tools.map((tool, idx) => (
				<Box
					sx={{ borderRadius: "20px", backgroundColor: orange[200], p: "15px" }}
					key={idx}
				>
					<Box sx={{ position: "relative", height: "50px" }}>
						<Image
							src={tool.icon}
							blurDataURL={tool.icon}
							layout="fill"
							objectFit="contain"
							placeholder="blur"
							priority
						></Image>
					</Box>
				</Box>
			))}
		></WidgetMulti>
	);
};

export default Tool;
