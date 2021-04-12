import data from "../../../data/graphqlUser.json";
import { readFileSync, writeFileSync } from "fs";

const getDate = () => {
	const now = new Date();
	return now.getMinutes() + ":" + now.getSeconds();
};

export const resolvers = {
	Query: {
		users: () => data.users,
		user(parent, args, context) {
			const result = data.users.find((user) => user.id === parseInt(args.id));
			if (result) {
				result.date = getDate();
			}

			return result;
		},
	},
	Mutation: {
		addUser: (_, { input }, context) => {
			const usersBuffer = readFileSync("lib/data/graphqlUser.json");
			const usersString = usersBuffer.toString();
			const users = JSON.parse(usersString);
			writeFileSync(
				"lib/data/graphqlUser.json",
				JSON.stringify({
					users: [...users.users, input],
				}),
			);

			return input;
		},
	},
};
