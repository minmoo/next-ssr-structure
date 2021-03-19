import { readFileSync, writeFileSync } from "fs";

export type StoredUserType = {
	userId: string;
	password: string;
	name: string;
};

const getList = () => {
	const usersBuffer = readFileSync("lib/data/users.json");
	const usersString = usersBuffer.toString();
	if (!usersString) {
		return [];
	}

	const users: StoredUserType[] = JSON.parse(usersString);
	return users;
};

const exist = ({ id }: { id: string }) => {
	const users = getList();
	return users.some((user) => user.userId === id);
};

const write = async (user: StoredUserType) => {
	const users = getList();
	writeFileSync("lib/data/users.json", JSON.stringify([...users, user]));
};

const find = ({ userId }: { userId: string }) => {
	const users = getList();
	return users.find((user) => user.userId === userId);
};
export default { getList, exist, write, find };
