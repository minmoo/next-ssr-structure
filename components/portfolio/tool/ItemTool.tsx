import { ModelTool } from "@/models/tool";
import { Box } from "@mui/material";
import Image from "next/image";
import { orange } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useState } from "react";

const spring = {
	type: "spring",
	stiffness: 500,
	damping: 30,
};

interface ItemToolProps {
	tool: ModelTool;
}
const ItemTool = ({ tool }: ItemToolProps) => {
	const [isHovered, setHovered] = useState<boolean>(false);

	return (
		<Box
			sx={{
				position: "relative",
				p: "15px",
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<Box
				sx={{
					borderRadius: "20px",
					backgroundColor: orange[200],
					position: "relative",
					height: "70px",
				}}
			>
				<Image
					src={tool.icon}
					blurDataURL={tool.icon}
					layout="fill"
					objectFit="contain"
					placeholder="blur"
					priority
				></Image>
			</Box>
			{isHovered && (
				<Box
					component={motion.div}
					layoutId="outlineTool"
					initial={false}
					animate={{ borderColor: orange[900] }}
					transition={spring}
					sx={{
						position: "absolute",
						borderRadius: "20px",
						top: "1px",
						left: "1px",
						right: "1px",
						bottom: "1px",
						border: "10px solid white",
					}}
				/>
			)}
		</Box>
	);
};

export default ItemTool;
