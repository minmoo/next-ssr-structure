import Link from "@/components/mui/link/Link";
import { Stack, Toolbar } from "@mui/material";
import { TNavLink } from "./Header";

const Navbar = ({ navLinks }: { navLinks: TNavLink[] }) => {
	return (
		<Toolbar component="nav" sx={{ display: { xs: "none", md: "flex" } }}>
			<Stack direction="row" spacing={4}>
				{navLinks.map(({ title, path }, i) => (
					<Link
						key={`${title}${i}`}
						href={path}
						variant="button"
						sx={{ color: "white", opacity: 0.7 }}
					>
						{title}
					</Link>
				))}
			</Stack>
		</Toolbar>
	);
};

export default Navbar;
