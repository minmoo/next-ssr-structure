import Iphone from "@/layout/iphone";
import LockPaper from "@/layout/iphone/lock/LockPaper";
import MainPaper from "@/layout/iphone/home/HomePaper";
import LoadingPaper from "@/layout/iphone/common/LoadingPaper";
import { useSelector } from "store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "store/iphone";
import axios from "@/lib/api";
import { dehydrate, QueryClient } from "react-query";
import { GetServerSideProps } from "next";
import { preExperiences } from "@/lib/query/portfolio/experience";
import { preSkills } from "@/lib/query/portfolio/skill";
import { preProjects } from "@/lib/query/portfolio/project";
import { preTools } from "@/lib/query/portfolio/tool";

const Home = () => {
	const isLoading = useSelector((state) => state.iphone.isLoading);
	const dispatch = useDispatch();

	const getData = async () => {
		const data = await axios.get("/api/portfolio/tool");

		console.log("CSR Data: ", data);
	};

	useEffect(() => {
		dispatch(actions.setLoading(true));
		window.scrollTo(0, 0); //scroll 맨위로 이동
		getData();
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const queryClient = new QueryClient();

	await Promise.allSettled([
		preExperiences(queryClient),
		preSkills(queryClient),
		preProjects(queryClient),
		preTools(queryClient),
	]);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default Home;
