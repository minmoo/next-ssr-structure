import { Box } from "@mui/material";
import ParallaxWrapper, {
	ParallaxWrapProps,
} from "@components/common/Parallax";
import LockBackground from "./LockBackground";
import LockContent from "./LockContent";

const Lock = ({ callbackRef }: ParallaxWrapProps) => {
	return (
		<Box
			sx={{
				width: { md: "40px", xs: "30px" },
				height: { md: "30px", xs: "25px" },
				borderColor: "white",
				borderStyle: "solid",
				borderTopWidth: { md: "10px", xs: "5px" },
				borderLeftWidth: { md: "10px", xs: "5px" },
				borderRightWidth: { md: "10px", xs: "5px" },
				borderBottom: "none",
				borderRadius: "25px 25px 0px 0px",
				position: "relative",
				top: "3px",
				willChange: "transform",
				transformOrigin: { md: "35px 40px", xs: "25px 30px" },
			}}
			ref={callbackRef}
		></Box>
	);
};

const PxLock = ParallaxWrapper(Lock, "spin", 0, 100, "1.8deg");
const PxBackground = ParallaxWrapper(LockBackground, "up", 100, 300, "0.5%");
const PxContent = ParallaxWrapper(LockContent, "up", 100, 300, "0.5%");

const LockPaper = () => {
	return (
		<>
			<PxBackground />
			<PxContent>
				<PxLock />
			</PxContent>
		</>
	);
};

// export default ParallaxWrapper(LockPaper, 'down', 100, 300, ;
export default LockPaper;
