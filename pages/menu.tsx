import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MenuPage = () => {
	return (
		<>
			<h1>This is menu page</h1>
			<Box
				component={motion.div}
				animate={{ x: [0, 100, 0] }}
				initial={true}
				transition={{ ease: "easeOut", duration: 2 }}
				ml="50px"
			>
				반갑습니다
			</Box>
			<motion.circle cx={500} animate={{ cx: [null, 100] }} />
		</>
	);
};

export default MenuPage;
