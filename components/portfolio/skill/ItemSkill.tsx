import LinearProgressWithLabel from "@/components/mui/common/LinearProgressWithLabel";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";
import { ModelSkill } from "@/models/skill";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Box,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const spring = {
	type: "spring",
	stiffness: 500,
	damping: 30,
};
interface ItemSkillProps {
	skill: ModelSkill;
}
const ItemSkill = ({ skill }: ItemSkillProps) => {
	const itemRef = useRef<HTMLLIElement>(null);
	const [showValue, setShowValue] = useState<boolean>(false);
	const [isHovered, setHovered] = useState<boolean>(false);

	useIntersectionObserver(
		itemRef,
		([entry], io) => {
			// 화면안에 요소가 들어왔는지 체크
			if (entry.isIntersecting) {
				//기존 관찰하던 요소는 더 이상 관찰하지 않음(1번만 실행)
				io.unobserve(entry.target);
				setShowValue(true);
			}
		},
		{
			threshold: 1, //100%이상 화면에 들어왔을 때
			rootMargin: "-30% 0px",
		},
	);

	return (
		<ListItem
			ref={itemRef}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			sx={{ position: "relative" }}
		>
			<ListItemAvatar>
				<Avatar src={skill.icon} variant="square" />
			</ListItemAvatar>
			<ListItemText
				primary={
					<LinearProgressWithLabel
						value={showValue ? skill.proficient : 0}
						valueBuffer={0}
						color="success"
					/>
				}
				secondary={skill.title}
				secondaryTypographyProps={{ color: "black" }}
			/>
			{isHovered && (
				<Box
					component={motion.div}
					layoutId="outlineSkill"
					initial={false}
					animate={{ borderColor: orange[700] }}
					transition={spring}
					sx={{
						position: "absolute",
						top: "0px",
						left: "0px",
						right: "0px",
						bottom: "0px",
						borderLeft: "3mm ridge rgb(170, 50, 220, .6)",
						borderRight: "3mm ridge rgb(170, 50, 220, .6)",
					}}
				/>
			)}
		</ListItem>
	);
};

export default ItemSkill;
