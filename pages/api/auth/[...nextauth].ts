import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";


const options: NextAuthOptions = {
	//configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId:process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		})
	],
	debug: process.env.NODE_ENV === "development",
	secret: process.env.AUTH_SECRET,
	jwt: {
		secret: process.env.JWT_SECRET!,
	},
	session: {
		strategy: "jwt", //no database
		maxAge: 30, // 30초
	},
	pages: {
		//custom page url
		signIn: "/auth/login",
	},
	callbacks: {
		async redirect({url, baseUrl}){
			return "/";
		}
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
