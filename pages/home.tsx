import Iphone from "@layout/iphone";
import LockPaper from "@layout/iphone/lock/LockPaper";
import MainPaper from "@layout/iphone/home/HomePaper";

const Home = () => {
	return (
		<Iphone>
			<MainPaper />
			<LockPaper />
		</Iphone>
	);
};

export default Home;
