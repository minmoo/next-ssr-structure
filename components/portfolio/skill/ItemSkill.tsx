import LinearProgressWithLabel from "@/components/mui/common/LinearProgressWithLabel";
import useIntersectionObserver from "@/lib/hooks/useIntersectionObserver";
import { ModelSkill } from "@/models/skill";
import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { useRef, useState } from "react";

interface ItemSkillProps {
	skill: ModelSkill;
}
const ItemSkill = ({ skill }: ItemSkillProps) => {
	const itemRef = useRef<HTMLLIElement>(null);
	const [showValue, setShowValue] = useState<boolean>(false);

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
		<ListItem ref={itemRef}>
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
		</ListItem>
	);
};

export default ItemSkill;
