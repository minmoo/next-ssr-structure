import {
	AppBar,
	Container,
	IconButton,
	Slide,
	Toolbar,
	useScrollTrigger,
} from "@mui/material";
import Link from "@/components/mui/link/Link";
import { Home } from "@mui/icons-material";
import Navbar from "@/layout/main/Navbar";
import SideDrawer from "@/layout/main/SideDrawer";
import { useEffect, useState } from "react";
import { PARALLAX } from "@/lib/constants/base";
import { grey } from "@mui/material/colors";

export type TNavLink = {
	title: string;
	path: string;
};
const navLinks: TNavLink[] = [
	{ title: "home", path: "/" },
	{ title: "menu", path: "/menu" },
	{ title: "test", path: "/test" },
	{ title: "test2", path: "/test2" },
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
						<IconButton edge="start" aria-label="home">
							<Link href="/">
								<Home
									sx={{ color: (theme) => theme.palette.common.white }}
									fontSize="large"
								/>
							</Link>
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
