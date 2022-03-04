import { Grid, Typography, Stack, Box, useTheme } from "@mui/material";
import SequenceText from "@/components/mui/motion/SequenceText";
import { motion } from "framer-motion";

const container = {
	visible: {
		transition: {
			staggerChildren: 0.025,
		},
	},
};

const LockTitle = () => {
	const theme = useTheme();
	return (
		<Stack
			component={motion.div}
			variants={container}
			whiteSpace="pre-wrap"
			justifyContent="center"
			alignItems="center"
			spacing={1}
		>
			<Box>
				<SequenceText variant="h1" color="white">
					{`Hello, I'm `}
				</SequenceText>
				<SequenceText variant="h1" color={theme.palette.primary.main}>
					Minsu Kim.
				</SequenceText>
			</Box>

			<Box>
				<SequenceText variant="h3" color="white">
					{`I'm a `}
				</SequenceText>
				<SequenceText variant="h3" color={theme.palette.secondary.main}>
					{`full-stack `}
				</SequenceText>
				<SequenceText variant="h3" color="white">
					developer.
				</SequenceText>
			</Box>
		</Stack>
	);
};

export default LockTitle;
