import { gql } from "@apollo/client";

export const USERS_LIST = gql`
	query users {
		users {
			id
			name
			color
		}
	}
`;

export const USER_DETAIL = gql`
	query user($userId: String!) {
		user(id: $userId) {
			id
			name
			color
			date
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($input: InputUser!) {
		addUser(input: $input) {
			id
			name
			color
		}
	}
`;
