import Iphone from "@/layout/iphone";
import LockPaper from "@/layout/iphone/lock/LockPaper";
import MainPaper from "@/layout/iphone/home/HomePaper";
import LoadingPaper from "@/layout/iphone/common/LoadingPaper";
import { useSelector } from "store";
import { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { GetServerSideProps } from "next";
import { preExperiences } from "@/lib/query/portfolio/experience";
import { preSkills } from "@/lib/query/portfolio/skill";
import { preProjects } from "@/lib/query/portfolio/project";
import { preTools } from "@/lib/query/portfolio/tool";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
	const isLoading = useSelector((state) => state.iphone.isLoading);

	useEffect(() => {
		//scroll 맨위로 이동
		window.onbeforeunload = function pushRefresh() {
			window.scrollTo(0, 0);
		};
	}, []);

	return (
		<Iphone>
			<MainPaper />
			<LockPaper />
			<AnimatePresence>
				{isLoading && (
					<motion.div
						exit={{ y: "-100vh", opacity: 0, transition: { duration: 0.7 } }}
					>
						<LoadingPaper />
					</motion.div>
				)}
			</AnimatePresence>
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
