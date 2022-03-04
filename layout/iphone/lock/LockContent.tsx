import { Box, Grid, Typography } from "@mui/material";
import FlashIcon from "@mui/icons-material/FlashlightOn";
import CameraIcon from "@mui/icons-material/CameraAlt";
import ArrowDownIcon from "@mui/icons-material/ArrowDownwardRounded";
import { ParallaxWrapProps } from "@/components/common/Parallax";
import IphonePaper from "../common/IphonePaper";
import LockTitle from "./LockTitle";
import { motion } from "framer-motion";
interface LockContentProps extends ParallaxWrapProps {
	children: JSX.Element;
}

const barVariants = {
	visible: {
		y: "10px",
		transition: {
			duration: 0.8,
			yoyo: Infinity,
		},
	},
};

const LockContent = ({
	children,
	callbackRef,
}: LockContentProps): JSX.Element => {
	return (
		<IphonePaper full transparent transitionMs={300} ref={callbackRef}>
			<Grid
				component={motion.section}
				container
				height="100%"
				pt="30px"
				initial="hidden"
				whileInView="visible"
			>
				{/* LOCK  */}
				<Grid
					item
					container
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					height="20%"
				>
					<Grid item>{children}</Grid>
					<Grid item>
						<Box
							sx={{
								width: { md: "50px", xs: "40px" },
								height: { md: "50px", xs: "40px" },
								backgroundColor: "white",
								borderRadius: "10px",
							}}
						></Box>
					</Grid>
				</Grid>
				{/* TITLE SUBTITLE */}
				<Grid
					item
					container
					flexDirection="column"
					justifyContent="flex-start"
					alignItems="center"
					height="55%"
					// minHeight={MIN_ONE_VH * 60}
				>
					<LockTitle />
				</Grid>

				{/* BOTTOM CAMERA FLASH */}
				<Grid
					item
					container
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					height="15%"
				>
					<Grid item pl="3vw">
						<Box
							component={motion.div}
							whileHover={{
								borderRadius: 0,
								backgroundColor: "rgba(0, 0, 0, 0.8)",
								scale: 1.1,
							}}
							sx={{
								height: "100px",
								width: "100px",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								borderRadius: "50%",
								textAlign: "center",
								filter: "blur(0)",
							}}
						>
							<FlashIcon
								sx={{
									fontSize: { md: "32px", xs: "20px" },
									color: "white",
									height: "100%",
								}}
							/>
						</Box>
					</Grid>
					<Grid item pr="3vw">
						<Box
							component={motion.div}
							whileHover={{
								borderRadius: 0,
								backgroundColor: "rgba(0, 0, 0, 0.8)",
								scale: 1.1,
							}}
							sx={{
								height: "100px",
								width: "100px",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								borderRadius: "50%",
								textAlign: "center",
								filter: "blur(0)!important",
							}}
						>
							<CameraIcon
								sx={{
									fontSize: { md: "32px", xs: "20px" },
									color: "white",
									height: "100%",
									filter: "blur(0)!important",
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				{/* BAR */}
				<Grid
					item
					container
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					height="10%"
					component={motion.div}
					variants={barVariants}
				>
					<Grid
						item
						container
						flexDirection="row"
						alignItems="center"
						justifyContent="center"
						textAlign="center"
						height="30px"
					>
						<Grid item height={"30px"}>
							<Typography color="white">Scroll</Typography>
						</Grid>
						<Grid item sx={{ textAlign: "center", height: "30px" }}>
							<ArrowDownIcon color="info" sx={{ fontSize: { md: "20px" } }} />
						</Grid>
					</Grid>
					<Grid item>
						<Box
							sx={{
								width: "30vw",
								maxWidth: "500px",
								backgroundColor: "white",
								height: "15px",
								borderRadius: "30px",
							}}
						></Box>
					</Grid>
				</Grid>
			</Grid>
		</IphonePaper>
	);
};

export default LockContent;
