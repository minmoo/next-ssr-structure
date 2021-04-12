import { addApolloState, getApolloClient } from "../../lib/apolloClient";
import { useRouter } from "next/router";
import { USER_DETAIL } from "../../lib/gql/user";
import { useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";

const Id = () => {
	const router = useRouter();
	const {
		query: { id: userId },
	} = router;

	const { loading, error, data } = useQuery(USER_DETAIL, {
		variables: { userId },
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	const { user } = data;

	return (
		<div>
			<div>{user.name}</div>
			<div>{user.id}</div>
			<div>{user.color}</div>
			<div>{user.date}</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { id } = query;
	const client = getApolloClient({});

	const { data } = await client.query({
		query: USER_DETAIL,
		variables: { userId: id },
	});

	return addApolloState(client, {
		props: {},
	});
};

export default Id;
