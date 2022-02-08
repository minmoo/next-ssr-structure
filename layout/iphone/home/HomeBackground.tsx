import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import WifiIcon from "@mui/icons-material/Wifi";
import IphonePaper from "../common/IphonePaper";
import homeBackgroundImage from "@public/bg4.jpg";
import Link from "@components/mui/link/Link";
import { Home } from "@mui/icons-material";
import Navbar from "@layout/main/Navbar";
import SideDrawer from "@layout/main/SideDrawer";

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

const HomeBackground = () => {
	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					width: "80vw",
					borderRadius: "30px",
					top: "40px",
					left: "50%",
					backgroundColor: "black",
					transform: "translate(-50%,0)",
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
			<IphonePaper full>
				<Image
					src={homeBackgroundImage}
					layout="fill"
					objectFit="cover"
					priority
				/>
				<Box sx={{ position: "absolute", top: "5px", right: "100px" }}>
					<WifiIcon fontSize="medium" sx={{ color: "white" }} />
				</Box>

				<Box sx={{ position: "absolute", top: "5px", right: "35px" }}>
					<Image src="/battery.png" height={20} width={50} />
				</Box>
			</IphonePaper>
		</>
	);
};

export default HomeBackground;
