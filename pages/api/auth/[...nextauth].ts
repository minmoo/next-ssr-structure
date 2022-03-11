import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

const options: NextAuthOptions = {
	//configure one or more authentication providers
	providers: [
		/**
		 * Github settings > Developer settings > OAuth Apps에 등록된 값
		 */
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			// scope: "read:user",
		}),
		/**
		 * 1. async authorize에 인증 실행
		 * 2. callbacks의 jwt 함수가 실행
		 * 3. callbacks의 session 함수가 실행
		 */
		CredentialsProvider({
			name: "credentials",
			credentials: {
				userId: { label: "userId", type: "text", placeholder: "id" },
				password: { label: "password", type: "password" },
			},
			async authorize(
				credentials,
				req,
			): Promise<{ userId: string; role: string } | null> {
				if (!credentials) {
					return null;
				}

				const { userId, password } = credentials;

				if (userId === "admin" && password === "admin") {
					return { userId, role: "admin" };
				}

				if (userId === "guest" && password === "guest") {
					return { userId, role: "guest" };
				}
				throw new Error("아이디 혹은 패스워드가 틀립니다.");
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	secret: process.env.AUTH_SECRET,
	jwt: {
		secret: process.env.JWT_SECRET!,
	},
	session: {
		strategy: "jwt", //no database
		maxAge: 10, // 30초
	},
	pages: {
		//custom page url
		signIn: "/home",
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user && account) {
				if (account?.provider === "credentials") {
					token.userId = user?.userId;
					token.role = user?.role;
				} else if (account?.provider === "github") {
					token.userId = user?.id;
					token.role = "guest";
				}
				token.something = "something";
			}
			return token;
		},
		async session({ session, user, token }) {
			if (token) {
				session.user.id = token.userId as string;
				session.user.role = token.role as string;
				session.something = token.something;
			}
			return session;
		},
		// async redirect({ url, baseUrl }) {
		// 	return "/admin/dashboard";
		// },
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
