import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AUTHORITY } from "@/lib/constants/base";
import { useSelector } from "@/store";
interface WidgetMultiProps {
	title: string;
	primaryColor: string;
	secondaryColor: string;
	columnCount?: 2 | 4;
	items: React.ReactNode[];
	onAdminEdit?: () => void;
}

const WidgetMulti = ({
	title,
	items,
	primaryColor,
	columnCount = 2,
	secondaryColor,
	onAdminEdit,
	sx = [],
}: WidgetMultiProps & GridProps) => {
	const authority = useSelector((state) => state.iphone.authority);
	return (
		<Grid
			item
			container
			direction="column"
			sx={[
				{
					borderRadius: "20px",
					overflow: "hidden",
					boxShadow: 5,
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		>
			<Grid item sx={{ p: "10px", bgcolor: primaryColor }}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
				>
					<Typography variant="h3" color="white">
						{title}
					</Typography>
					{authority === AUTHORITY.ADMIN && (
						<Chip
							label="Edit"
							color="secondary"
							size="small"
							icon={<EditIcon />}
							onClick={onAdminEdit}
						/>
					)}
				</Stack>
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
