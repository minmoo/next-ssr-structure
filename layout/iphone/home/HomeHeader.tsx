import {
	AppBar,
	Container,
	IconButton,
	Slide,
	Stack,
	Toolbar,
	useScrollTrigger,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import SideDrawer from "@/layout/main/SideDrawer";
import { useEffect, useState } from "react";
import { PARALLAX } from "@/lib/constants/base";
import { grey } from "@mui/material/colors";
import Navbar from "@/layout/main/Navbar";
import { TNavLink } from "@/layout/main/Header";

const navLinks: TNavLink[] = [
	{ title: "experience", path: PARALLAX.LOCK_PAPER[1] },
	{ title: "project", path: PARALLAX.PROJECT_SLIDER[0] },
	{ title: "contact", path: -1 },
];

const HomeHeader = () => {
	const trigger = useScrollTrigger();
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset < PARALLAX.LOCK_PAPER[1]) {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	return (
		<Slide appear={false} direction="down" in={!trigger && show}>
			<AppBar
				position="fixed"
				sx={{
					width: "80%",
					borderRadius: "20px",
					top: "40px",
					left: "10%",
				}}
			>
				<Toolbar>
					<Container
						maxWidth="lg"
						sx={{ display: `flex`, justifyContent: `space-between` }}
					>
						<IconButton
							edge="start"
							aria-label="home"
							onClick={() => {
								window.scrollTo(0, 0);
							}}
						>
							<Home
								sx={{ color: (theme) => theme.palette.common.white }}
								fontSize="large"
							/>
						</IconButton>
						<Navbar navLinks={navLinks} />
						<SideDrawer navLinks={navLinks} />
					</Container>
				</Toolbar>
			</AppBar>
		</Slide>
	);
};

export default HomeHeader;
