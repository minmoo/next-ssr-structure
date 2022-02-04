import { Avatar, Box, Grid, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import WidgetMulti from "@components/mui/grid/WidgetMulti";
import portfolio from "@lib/data/portfolio";
import Image from "next/image";
const Tool = () => {
	const tools = portfolio.tools;
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
					<Box sx={{ position: "relative", height: "70px" }}>
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
