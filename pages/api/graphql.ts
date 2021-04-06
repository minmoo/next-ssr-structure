import { ApolloServer, gql, ResolveType } from "apollo-server-micro";

const typeDefs = gql`
	type Query {
		users: [User!]!
		user(id: String!): User!
	}
	type User {
		id: String
		name: String
		color: String
	}
`;

const resolvers = {
	Query: {
		users() {
			return [{ name: "Next.js" }];
		},
		user() {
			return { id: "id", name: "minsu", color: "red" };
		},
	},
};

// context에서 return 한 값은 모든 resolver의 메소드 context인자로 들어가기 때문에
// DB는 context에 연결해두고 사용한다.
const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
	api: {
		bodyParser: false,
	},
};

export default apolloServer.createHandler({ path: "/api/graphql" });
