import { Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { initializeApollo } from "../../lib/apolloClient";
import { USER_DETAIL } from "../../lib/gql/user";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

const Ssg: NextPage = () => {
	const userId = "163235";
	const { loading, error, data } = useQuery(USER_DETAIL, {
		variables: { userId },
	});

	let user;
	if (!loading) {
		user = data.user;
	}

	return (
		<>
			<Head>
				<title>graphql</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						{user ? <div>{user.date}</div> : <div>Loading...</div>}
					</GridItem>
				</GridContainer>
				<Link href="/graphql">Move to 'graphql'</Link>
			</Container>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	//browser단의 context(headers)를 SSR에 넘기는 과정
	const client = initializeApollo(null, ctx);
	const userId = "163235";
	const { data } = await client.query({
		query: USER_DETAIL,
		variables: { userId },
	});

	return {
		props: {
			initialApolloState: client.cache.extract(),
		},
		revalidate: 1,
	};
};

export default Ssg;
