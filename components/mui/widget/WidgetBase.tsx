import { useSelector } from "@/store";
import {
	Chip,
	Divider,
	Grid,
	GridProps,
	Stack,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AUTHORITY } from "@/lib/constants/base";
interface WidgetBaseProps {
	title: string;
	subTitle: string;
	primaryColor: string;
	secondaryColor: string;
	onAdminEdit?: () => void;
}
const WidgetBase = ({
	children,
	primaryColor,
	secondaryColor,
	title,
	subTitle,
	onAdminEdit,
	sx = [],
}: WidgetBaseProps & GridProps) => {
	const authority = useSelector((state) => state.iphone.authority);
	return (
		<Grid
			item
			container
			justifyContent="center"
			alignItems="stretch"
			sx={[
				{
					borderRadius: "20px",
					overflow: "hidden",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		>
			{/* title */}
			<Grid
				item
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				md={3}
				xs={12}
				sx={{
					...(primaryColor && {
						backgroundColor: primaryColor,
					}),
				}}
			>
				<Grid item>
					<Stack
						direction={{ xs: "row", md: "column" }}
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
				<Grid item sx={{ display: { xs: "none", md: "flex" } }}>
					<Typography variant="body1" color="whitesmoke">
						{subTitle}
					</Typography>
				</Grid>
			</Grid>

			{/* content */}
			<Grid
				item
				md={9}
				xs={12}
				sx={{
					...(secondaryColor && {
						backgroundColor: secondaryColor,
					}),
				}}
			>
				{children}
			</Grid>
		</Grid>
	);
};

export default WidgetBase;
