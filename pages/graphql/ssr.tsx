import { Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { getApolloClient, addApolloState } from "../../lib/apolloClient";
import { USER_DETAIL } from "../../lib/gql/query/user";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

const Ssr: NextPage = () => {
	const userId = "1";
	const { loading, error, data, refetch } = useQuery(USER_DETAIL, {
		variables: { userId },
		notifyOnNetworkStatusChange: true,
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	const { user } = data;

	return (
		<>
			<Head>
				<title>graphql</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						<div>{user.name}</div>
						<div>{user.id}</div>
						<div>{user.color}</div>
						<div>{user.date}</div>
					</GridItem>
					<button onClick={() => refetch()}>Refetch!</button>
				</GridContainer>
				<Link href="/graphql">Move to '/graphql'</Link>
				<Link href="/graphql/ssr">Move to '/graphql/ssr'</Link>
			</Container>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	//browser단의 context(headers)를 SSR에 넘기는 과정
	const client = getApolloClient({});
	const userId = "1";
	const { data } = await client.query({
		query: USER_DETAIL,
		variables: { userId },
	});

	console.log("getServerSideProps");
	console.log(`${data.user.date}`);
	return addApolloState(client, {
		props: {},
	});
};

export default Ssr;
