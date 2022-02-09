import LinkWithScroll from "@/components/mui/link/LinkWithScroll";
import { Stack, Toolbar } from "@mui/material";
import { TNavLink } from "./Header";

const Navbar = ({ navLinks }: { navLinks: TNavLink[] }) => {
	return (
		<Toolbar component="nav" sx={{ display: { xs: "none", md: "flex" } }}>
			<Stack direction="row" spacing={4}>
				{navLinks.map(({ title, path }, i) => (
					<LinkWithScroll
						key={`${title}${i}`}
						path={path}
						variant="button"
						sx={{ color: "white", opacity: 0.7 }}
					>
						{title}
					</LinkWithScroll>
				))}
			</Stack>
		</Toolbar>
	);
};

export default Navbar;
