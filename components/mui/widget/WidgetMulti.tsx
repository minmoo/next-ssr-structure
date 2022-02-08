import { Grid, GridProps, Typography } from "@mui/material";

interface WidgetMultiProps {
	title: string;
	primaryColor: string;
	secondaryColor: string;
	columnCount?: 2 | 4;
	items: React.ReactNode[];
}

const WidgetMulti = ({
	title,
	items,
	primaryColor,
	columnCount = 2,
	secondaryColor,
	sx = [],
}: WidgetMultiProps & GridProps) => {
	return (
		<Grid
			item
			container
			direction="column"
			sx={[
				{
					borderRadius: "20px",
					overflow: "hidden",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		>
			<Grid item sx={{ p: "10px", bgcolor: primaryColor }}>
				<Typography variant="h3" color="white">
					{title}
				</Typography>
			</Grid>

			<Grid item container sx={{ bgcolor: secondaryColor }}>
				{items.map((item, idx) => (
					<Grid
						item
						md={12 / columnCount}
						xs={(12 / columnCount) * 2}
						key={idx}
						sx={{ p: { md: "20px", xs: "10px" } }}
					>
						{item}
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default WidgetMulti;
