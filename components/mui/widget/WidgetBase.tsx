import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AUTHORITY } from "@/lib/constants/base";
import BounceText from "../motion/BounceText";
import { useSession } from "next-auth/react";
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
	const { data: session, status } = useSession();

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
					boxShadow: 5,
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
						<BounceText variant="h3" color="white">
							{title}
						</BounceText>
						{session?.user?.role === AUTHORITY.ADMIN && (
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
