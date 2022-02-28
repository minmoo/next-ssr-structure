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

/**
 * @param props props를 입력해랏
 * @returns 바운스텍스트 나온다
 */
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
