import { Container } from "@mui/material";
import GridContainer from "components/common/grid/GridContainer";
import GridItem from "components/common/grid/GridItem";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { Page } from "../../types/page";

const Secret: Page = () => {
	// session이 항상 있다.(_app.tsx에서 공통관리하기 때문에)
	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Secret</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={12} sm={12} lg={12}>
						SECRET
						{status === "authenticated" && <p>사용자 ID: {session?.userId}</p>}
					</GridItem>
				</GridContainer>
			</Container>
		</>
	);
};

Secret.auth = {
	role: "admin",
	loading: <div>Loading...</div>,
}; // auth 체크 여부

export default Secret;
