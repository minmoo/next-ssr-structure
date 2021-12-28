import { AppProps } from "next/app";
import React, { Fragment, useEffect } from "react";
import { wrapper } from "../store";
import ThemeProvider from "../styles/ThemeProvider";
import GlobalStyles from "../styles/GlobalStyles";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import type { Page, Role } from "../types/page";
import Admin from "../layout/Admin";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { StyledEngineProvider } from "@mui/material/styles";
import Router from "next/router";

type Tprops = AppProps & {
	Component: Page;
};

const MyApp = ({ Component, pageProps = {}, router }: Tprops) => {
	useEffect(() => {
		//서버사이드에서 삽입한 CSS를 제거
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	// Apollo (SSG, SSR)
	const apolloClient = useApollo(pageProps);

	const AdminLayout = router.pathname.startsWith("/admin/") ? Admin : Fragment;
	const Layout = Component.layout || AdminLayout;

	const Common = (
		<ApolloProvider client={apolloClient}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider>
					<GlobalStyles />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</StyledEngineProvider>
		</ApolloProvider>
	);
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1"
				/>
			</Head>
			<SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
				{Component.auth ? (
					<Auth {...Component.auth}>{Common}</Auth>
				) : (
					<>{Common}</>
				)}
			</SessionProvider>
		</>
	);
};

const Auth = ({
	children,
	role = "guest",
	loading = <div>Loading...</div>,
}: {
	children: JSX.Element;
	role?: Role;
	loading?: JSX.Element;
}): JSX.Element => {
	const { data: session, status } = useSession();
	const isUser = !!session?.user && session?.user.role === role;

	useEffect(() => {
		if (status === "loading") return; // loading중엔 아무것도 안한다.

		if (!isUser) {
			if (session?.user.role !== role) {
				alert("권한이 없습니다!");
				Router.back(); //권한이 다르면 back
			} else {
				signIn(); //로그인 안했으면 강제 로그인
			}
		}
	}, [isUser, status, session?.user.role, role]);

	if (isUser) {
		return children;
	}

	//로그인 체크 중일 경우
	return <>{loading}</>;
};

//redux store, redux-saga를 컴포넌트에 전달
export default wrapper.withRedux(withReduxSaga(MyApp));
