import { Button, Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { ADD_USER, USERS_LIST } from "../../lib/gql/user";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

const Graphql = () => {
	const userId = "1";
	const { loading, error, data } = useQuery(USERS_LIST);

	const [addUser, { data: mutationData }] = useMutation(ADD_USER);

	const handleClick = () => {
		const input = {
			id: 100,
			name: "add",
			color: "black",
		};

		addUser({
			variables: {
				input: input,
			},
			update: (cache) => {
				const existingUsers = cache.readQuery({ query: USERS_LIST });
				const newUsers = [...existingUsers.users, input];
				cache.writeQuery({
					query: USERS_LIST,
					data: { users: newUsers },
				});
			},
		});
	};

	if (loading) return <div> Loading</div>;

	const { users } = data;

	return (
		<>
			<Head>
				<title>graphql</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					{users.map((user, index) => (
						<GridItem xs={12} xl={3} sm={6} lg={3} key={index}>
							<div> {user.name}</div>
							<div> {user.id}</div>
							<div> {user.color}</div>
							<Link href={`/graphql/${user.id}`}>Move to 'detail'</Link>
						</GridItem>
					))}
					<Link href="/graphql/ssg">Move to 'ssg'</Link>
					<Link href="/graphql/ssr">Move to 'ssr'</Link>
					<Link href="/graphql/ssrEvery">Move to 'ssrEvery'</Link>
				</GridContainer>
				<Button onClick={handleClick}>Add User</Button>
			</Container>
		</>
	);
};

export default Graphql;
