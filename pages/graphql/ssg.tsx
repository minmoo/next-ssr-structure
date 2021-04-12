import { Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { addApolloState, getApolloClient } from "../../lib/apolloClient";
import { USER_DETAIL } from "../../lib/gql/user";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

const Ssg: NextPage = () => {
	const userId = "1";
	const { loading, error, data } = useQuery(USER_DETAIL, {
		variables: { userId },
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
				</GridContainer>
				<Link href="/graphql">Move to '/graphql'</Link>
				<Link href="/graphql/ssg">Move to '/graphql/ssg'</Link>
			</Container>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	//browser단의 context(headers)를 SSR에 넘기는 과정
	const client = getApolloClient({});

	const userId = "1";
	const { data } = await client.query({
		query: USER_DETAIL,
		variables: { userId },
	});

	console.log("getStaticProps");
	console.log(`${JSON.stringify(data.user)}`);

	return addApolloState(client, {
		props: {},
		revalidate: 1,
	});
};

export default Ssg;
