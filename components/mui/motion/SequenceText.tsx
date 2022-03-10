import { Box, Typography, TypographyProps } from "@mui/material";
import { motion } from "framer-motion";

interface SequenceTextProps extends TypographyProps<typeof motion.span> {
	children: string;
	color: string;
}

const SequenceText = (props: SequenceTextProps) => {
	const { children, color, ...rest } = props;

	const splitText = [...children];

	const variants = {
		hidden: {
			y: "100%",
			color: "#0055FF",
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
		},
		visible: {
			y: 0,
			color,
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
		},
	};

	return (
		<Box component="span" sx={{ overflow: "hidden", display: "inline-block" }}>
			{splitText.map((word, idx) => (
				<Typography
					key={idx}
					component={motion.span}
					variants={variants}
					{...rest}
					sx={{ display: "inline-block" }}
				>
					{word}
				</Typography>
			))}
		</Box>
	);
};

export default SequenceText;
