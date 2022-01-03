import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Link from "@components/mui/link/Link";
import { Home } from "@mui/icons-material";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import HideOnScroll from "./HideOnScroll";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import BackToTop from "./BackToTop";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

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

const Header = () => {
	return (
		<>
			{/* scroll DOWN 일때 hide하고 UP할때 visible하게 한다. */}
			<HideOnScroll>
				{/* position fixed로 항상 위에 나오도록 한다. */}
				<AppBar position="fixed">
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
			</HideOnScroll>
			{/* 
      1. AppBar 가 fixed라서 내용이 가릴 수 있는데 Offset은 AppBar의 높이만큼 보이지않는 영역을 만든다.
      2. top으로 올려줄 영역이다.
      */}
			<Offset id="back-to-top-anchor" />
			<BackToTop>
				<Fab color="secondary" size="large" aria-label="back to top">
					<KeyboardArrowUp />
				</Fab>
			</BackToTop>
		</>
	);
};

export default Header;
