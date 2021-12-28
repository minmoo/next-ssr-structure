import { Container } from "@mui/material";
import GridContainer from "components/common/grid/GridContainer";
import GridItem from "components/common/grid/GridItem";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Secret: NextPage = () => {
	const { data: session, status } = useSession({
		required: true, // sign-in page로 redirect한다.
		onUnauthenticated() {
			// The user is not authenticated, handle it here
		},
	});

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

export default Secret;
