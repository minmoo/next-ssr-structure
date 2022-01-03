import Main from "@layout/main";
import Hero from "@layout/main/Hero";
import { Page } from "types/page";

const Home: Page = () => {
	return (
		<Hero
			imgSrc="/hero.jpg"
			imgAlt="satified"
			title="Title Content"
			subtitle="subtitle content"
		/>
	);
};

Home.layout = Main;

export default Home;
