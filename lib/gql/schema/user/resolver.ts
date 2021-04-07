const getDate = () => {
	const now = new Date();
	return now.getMinutes() + ":" + now.getSeconds();
};
let id = 0;
export const resolvers = {
	Query: {
		users: () => [{ name: "Next.js" }],
		user() {
			return { id: id++, name: "minsu", color: "red", date: getDate() };
		},
	},
};
