import { Button, Container } from "@material-ui/core";
import Head from "next/head";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { ADD_USER, USERS_LIST } from "../../lib/gql/query/user";
import { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

type Tuser = {
	id: number;
	name: string;
	color: string;
};

type TusersData = {
	users: Tuser[];
};

const Graphql = () => {
	const userId = "1";
	const { loading, error, data } = useQuery<TusersData>(USERS_LIST);

	const [
		addUser,
		{ loading: mutaionLoading, data: mutationData },
	] = useMutation<{ addUser: Tuser }, { input: Tuser }>(ADD_USER);

	const idRef = useRef(10);

	const handleClick = () => {
		const input = {
			id: idRef.current++,
			name: "add",
			color: "black",
		};

		addUser({
			variables: {
				input: input,
			},
			update: (cache) => {
				const existingUsers = cache.readQuery<TusersData>({
					query: USERS_LIST,
				});
				let newUsers;
				if (existingUsers) {
					newUsers = [...existingUsers.users, input];
				} else {
					newUsers = [input];
				}
				cache.writeQuery({
					query: USERS_LIST,
					data: { users: newUsers },
				});
			},
		});
	};

	if (loading) return <div> Loading</div>;

	if (!data) return <div> No data </div>;

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
