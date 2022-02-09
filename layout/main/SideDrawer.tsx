import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { useState } from "react";
import { TNavLink } from "./Header";
import Link from "@/components/mui/link/Link";
import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Stack,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const SideDrawer = ({ navLinks }: { navLinks: TNavLink[] }) => {
	const [state, setState] = useState({
		right: false,
	});

	const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: string) => (
		<Box
			sx={{ width: 250, marginTop: `auto`, marginBottom: `auto` }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<MenuList>
				{navLinks.map(({ title, path }, i) => (
					<MenuItem key={`${title}${i}`}>
						<ListItemIcon>
							<ContentCopy fontSize="small" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="button"
								sx={{
									ml: 5,
									my: 2,
									textTransform: `uppercase`,
								}}
							>
								<Link sx={{ color: "common.white" }} href={path}>
									{title}
								</Link>
							</Typography>
						</ListItemText>
					</MenuItem>
				))}
			</MenuList>
		</Box>
	);

	return (
		<>
			<IconButton
				edge="start"
				aria-label="menu"
				onClick={toggleDrawer("right", true)}
				sx={{
					color: "white",
					display: { xs: `inline`, md: `none` }, //xs, sm 일 때만 보인다.
				}}
			>
				<Menu fontSize="large" />
			</IconButton>
			<Drawer
				anchor="right"
				open={state.right}
				onClose={toggleDrawer("right", false)}
				sx={{
					".MuiDrawer-paper": {
						bgcolor: "primary.main",
					},
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile
				}}
			>
				{list("right")}
			</Drawer>
		</>
	);
};

export default SideDrawer;
