import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	type User {
		id: Int
		name: String
		color: String
		date: String
	}
	extend type Query {
		users: [User!]!
		user(id: String!): User!
	}

	input InputUser {
		id: Int
		name: String
		color: String
	}
	extend type Mutation {
		addUser(input: InputUser!): User!
	}
`;
