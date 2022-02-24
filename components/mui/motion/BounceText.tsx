import { Typography, TypographyProps } from "@mui/material";
import { motion } from "framer-motion";

const variant = {
	hover: {
		scale: 1.1,
		transition: {
			duration: 0.5,
			yoyo: Infinity,
		},
	},
};

const BounceText = (props: TypographyProps<typeof motion.span>) => {
	const { children, ...rest } = props;
	return (
		<Typography
			component={motion.span}
			variants={variant}
			whileHover="hover"
			{...rest}
		>
			{children}
		</Typography>
	);
};

export default BounceText;
