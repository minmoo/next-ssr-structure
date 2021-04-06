import { Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { useApollo } from "../../lib/apolloClient";
import { USER_DETAIL } from "../../lib/gql/user";
import { useState } from "react";
import { useQuery } from "@apollo/client";

const Graphql = () => {
	// const apolloClient = useApollo();
	// const [user, setUser] = useState();

	// (async () => {
	// 	const userId = "163235";
	// 	const { loading, error, data } = await apolloClient.query({
	// 		query: USER_DETAIL,
	// 		variables: { userId },
	// 	});
	// 	console.log(data.user);

	// 	setUser(data.user);
	// })();
	const userId = "163235";
	const { loading, error, data } = useQuery(USER_DETAIL, {
		variables: { userId },
	});

	if (!loading) {
		console.log(data);
	}

	const user = {
		name: "minsu",
	};

	return (
		<>
			<Head>
				<title>graphql</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						{user ? <div>{user.name}</div> : <div>Loading...</div>}
					</GridItem>
				</GridContainer>
			</Container>
		</>
	);
};

export default Graphql;
