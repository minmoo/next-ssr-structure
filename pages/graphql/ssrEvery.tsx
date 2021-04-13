import { Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { getApolloClient } from "../../lib/apolloClient";
import { USER_DETAIL } from "../../lib/gql/query/user";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
	GetServerSideProps,
	NextPage,
	InferGetServerSidePropsType,
} from "next";
import Link from "next/link";

// getServerSideProps의 output과 Component의 props 타입을 맞춰준다.
type TssrEveryProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SsrEvery: NextPage = ({ user }: TssrEveryProps) => {
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
				<Link href="/graphql/ssrEvery">Move to '/graphql/ssrEvery'</Link>
			</Container>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<any, any> = async (ctx) => {
	//browser단의 context(headers)를 SSR에 넘기는 과정
	const client = getApolloClient({});
	const userId = "1";
	const { data } = await client.query({
		query: USER_DETAIL,
		variables: { userId },
	});
	console.log("getServerSideProps");
	console.log(`${data.user.date}`);

	return {
		props: {
			user: data.user,
		},
	};
};

export default SsrEvery;
