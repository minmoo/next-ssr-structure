import Header from "@layout/main/Header";
import Footer from "./Footer";

const Main = ({ children }: { children: JSX.Element }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Main;
