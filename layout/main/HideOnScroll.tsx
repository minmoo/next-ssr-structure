import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

const HideOnScroll = ({ children }: { children: JSX.Element }) => {
	const trigger = useScrollTrigger();

	return (
		// Scroll down to check the header is hide or not.
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

export default HideOnScroll;
