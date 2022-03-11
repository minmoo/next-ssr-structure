import {
	AppBar,
	Box,
	Container,
	IconButton,
	Slide,
	Stack,
	Toolbar,
	useScrollTrigger,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SideDrawer from "@/layout/main/SideDrawer";
import { useEffect, useState } from "react";
import { PARALLAX } from "@/lib/constants/base";
import { grey } from "@mui/material/colors";
import Navbar from "@/layout/main/Navbar";
import { TNavLink } from "@/layout/main/Header";
import { signOut, useSession } from "next-auth/react";
import { useShowDialog } from "@/store/iphone/hooks";

const navLinks: TNavLink[] = [
	{ title: "experience", path: PARALLAX.LOCK_PAPER[1] },
	{ title: "project", path: PARALLAX.PROJECT_SLIDER[0] },
	{ title: "contact", path: -1 },
];

const HomeHeader = () => {
	const trigger = useScrollTrigger();
	const onShowDialog = useShowDialog();
	const [show, setShow] = useState<boolean>(false);
	const { data: session, status } = useSession();

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
						{session ? (
							<IconButton
								edge="start"
								onClick={() => {
									signOut({ redirect: false });
								}}
							>
								<LockOpenIcon
									sx={{ color: (theme) => theme.palette.common.white }}
									fontSize="large"
								/>
							</IconButton>
						) : (
							<IconButton
								edge="start"
								onClick={() => {
									onShowDialog({ type: "auth", open: true, title: "Login" });
								}}
							>
								<LockIcon
									sx={{ color: (theme) => theme.palette.common.white }}
									fontSize="large"
								/>
							</IconButton>
						)}
						<Navbar navLinks={navLinks} />
						<SideDrawer navLinks={navLinks} />
					</Container>
				</Toolbar>
			</AppBar>
		</Slide>
	);
};

export default HomeHeader;
