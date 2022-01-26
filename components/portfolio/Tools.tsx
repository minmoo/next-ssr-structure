import { Box, Grid, Typography } from "@mui/material";

const Tools = () => {
	return (
		<Grid container>
			<Grid item lg={4}>
				<Typography variant="h2">Tools I Use</Typography>
			</Grid>
			<Grid item lg={8} sx={{ flexBasis: "100%" }}>
				<Box sx={{ width: "100%", height: "400px", backgroundColor: "blue" }}>
					BOX
				</Box>
			</Grid>
		</Grid>
	);
};

export default Tools;
