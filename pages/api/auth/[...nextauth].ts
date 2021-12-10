import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const options: NextAuthOptions = {
	//configure one or more authentication providers
	providers: [
		Providers.Credentials({
			//The name to display on the sign in form
			name: "Credential",
			credentials: {
				userId: { label: "UserId", type: "text", placeholder: "blossom id" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any) {
				if ("userId" in credentials && "password" in credentials) {
					// const { data } = await axios.post(
					// 	process.env.LOGIN_API_URL +
					// 		`?userId=${credentials.userId}&userPwd=${credentials.password}`,
					// );

					const data =
						credentials.userId === "admin"
							? {
									login: "SUCCESS",
									userNm: "minsu",
									userId: credentials.userId,
							  }
							: {
									login: "FAIL",
							  };

					if (data?.login !== "SUCCESS") {
						throw new Error("fail message");
					} else {
						return {
							userNm: data.userNm,
							userId: data.userId,
						};
					}
				} else {
					return null;
				}
			},
		}),
	],
	jwt: {
		secret: process.env.JWT_SECRET!,
	},
	session: {
		jwt: true, //no database
		maxAge: 30, // 30초
	},
	pages: {
		//custom page url
		signIn: "/auth/login",
	},
	callbacks: {
		async jwt(
			token: any,
			user: { userNm: string; userId: string; token: string },
			account,
			profile,
			isNewUser: boolean,
		) {
			const isUserSignedIn = user ? true : false;

			if (isUserSignedIn) {
				token.userId = user.userId;
				token.userNm = user.userNm;
			}

			return token;
		},
		//pass the data through to the browser
		async session(session: any, token: any) {
			session.id = token.userId;
			session.name = token.userNm;

			return session;
		},
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
