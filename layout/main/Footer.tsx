import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Facebook, Instagram } from "@mui/icons-material";
import Link from "@components/mui/link/Link";

const Footer = () => {
	return (
		<Box component="footer" sx={{ py: 5, bgcolor: "primary.main" }}>
			<Stack direction="row" justifyContent="center" spacing={4} sx={{ mb: 5 }}>
				<Link
					sx={{ textDecoration: "none", color: "common.white" }}
					href="https://ko-kr.facebook.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Facebook fontSize="large" />
				</Link>

				<Link
					sx={{ textDecoration: "none", color: "common.white" }}
					href="https://www.instagram.com/?hl=ko"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Instagram fontSize="large" />
				</Link>
			</Stack>
			<Typography align="center" color="common.white">
				@1994 - {new Date().getFullYear()}, Start Page
			</Typography>
		</Box>
	);
};

export default Footer;
