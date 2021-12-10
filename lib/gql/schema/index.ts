import { gql, makeExecutableSchema } from "apollo-server-micro";
import * as user from "./user";

const RootSchema = gql`
	type Query {
		root: String
	}
	type Mutation {
		root: String
	}
`;

const RootResolver = {
	Query: {
		root: () => "Root resolver is running",
	},
};

export default makeExecutableSchema({
	typeDefs: [RootSchema, user.typeDefs],
	resolvers: [RootResolver, user.resolvers],
});
