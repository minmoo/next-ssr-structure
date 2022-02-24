import { Button, ButtonProps } from "@mui/material";
import { motion } from "framer-motion";

const variant = {
	hover: {
		scale: 1.2,
		transition: {
			duration: 0.5,
			yoyo: Infinity,
		},
	},
};

const BounceButton = (props: ButtonProps<typeof motion.button>) => {
	const { children, ...rest } = props;
	return (
		<Button
			component={motion.button}
			variants={variant}
			whileHover="hover"
			variant="contained"
			{...rest}
		>
			{children}
		</Button>
	);
};

export default BounceButton;
