import Iphone from "@layout/iphone";
import LockPaper from "@layout/iphone/lock/LockPaper";
import MainPaper from "@layout/iphone/home/HomePaper";
import LoadingPaper from "@layout/iphone/common/LoadingPaper";
import { useSelector } from "store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "store/iphone";

const Home = () => {
	const isLoading = useSelector((state) => state.iphone.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.setLoading(true));
	}, [dispatch]);

	return (
		<Iphone>
			{isLoading ? (
				<LoadingPaper />
			) : (
				<>
					<MainPaper />
					<LockPaper />
				</>
			)}
		</Iphone>
	);
};

export default Home;
