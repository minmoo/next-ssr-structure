import {
	LinearProgress,
	LinearProgressProps,
	Box,
	Typography,
} from "@mui/material";

const LinearProgressWithLabel = (
	props: LinearProgressProps & { value: number },
) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "90%", mr: 1 }}>
				<LinearProgress variant="buffer" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="black">{`${Math.round(
					props.value,
				)}`}</Typography>
			</Box>
		</Box>
	);
};

export default LinearProgressWithLabel;
