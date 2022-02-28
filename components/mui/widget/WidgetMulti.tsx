import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AUTHORITY } from "@/lib/constants/base";
import { useSelector } from "@/store";
import BounceText from "../motion/BounceText";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useRef, useState } from "react";
interface WidgetMultiProps {
	title: string;
	primaryColor: string;
	secondaryColor: string;
	columnCount?: 2 | 4;
	itemMargin?: boolean;
	items: React.ReactNode[];
	onAdminEdit?: () => void;
}

const list = {
	visible: {
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	hidden: {
		opacity: 0.5,
		transition: {
			when: "afterChildren",
		},
	},
};

const itemVariants = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 0, x: -100 },
};

const WidgetMulti = ({
	title,
	items,
	primaryColor,
	columnCount = 2,
	secondaryColor,
	itemMargin = false,
	onAdminEdit,
	sx = [],
}: WidgetMultiProps & GridProps) => {
	const authority = useSelector((state) => state.iphone.authority);

	return (
		<Grid
			item
			container
			direction="column"
			sx={[
				{
					borderRadius: "20px",
					overflow: "hidden",
					boxShadow: 5,
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		>
			<Grid item sx={{ p: "10px", bgcolor: primaryColor }}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
				>
					<BounceText variant="h3" color="white">
						{title}
					</BounceText>
					{authority === AUTHORITY.ADMIN && (
						<Chip
							label="Edit"
							color="secondary"
							size="small"
							icon={<EditIcon />}
							onClick={onAdminEdit}
						/>
					)}
				</Stack>
			</Grid>

			<Grid
				component={motion.div}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
				variants={list}
				item
				container
				sx={{ bgcolor: secondaryColor }}
			>
				<AnimateSharedLayout>
					{items.map((item, idx) => (
						<Grid
							component={motion.div}
							variants={itemVariants}
							item
							md={12 / columnCount}
							xs={(12 / columnCount) * 2}
							key={idx}
							sx={itemMargin ? { p: { md: "20px", xs: "10px" } } : undefined}
						>
							{item}
						</Grid>
					))}
				</AnimateSharedLayout>
			</Grid>
		</Grid>
	);
};

export default WidgetMulti;
