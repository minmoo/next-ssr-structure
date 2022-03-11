import HomeBackground from "./HomeBackground";
import HomeContent from "./HomeContent";
import HomeHeader from "./HomeHeader";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab } from "@mui/material";
const HomePaper = () => {
	return (
		<>
			<HomeHeader />
			<HomeBackground />
			<HomeContent />
			{/*TODO motion 넣자	*/}
			<Fab
				color="primary"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				onClick={() => window.scrollTo(0, 0)}
			>
				<ArrowUpwardIcon />
			</Fab>
		</>
	);
};

export default HomePaper;
