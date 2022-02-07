import { AppProps } from "next/app";
import React, { Fragment, useEffect } from "react";
import { wrapper } from "../store";
import ThemeProvider from "../styles/ThemeProvider";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import type { Page, Role } from "../types/page";
import Admin from "../layout/Admin";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Router from "next/router";
import createEmotionCache from "styles/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface MyAppProps extends AppProps {
	Component: Page;
	emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = ({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps = {},
	router,
}) => {
	// Apollo (SSG, SSR)
	const apolloClient = useApollo(pageProps);

	// React Query
	const [queryClient] = useState(() => new QueryClient());

	const AdminLayout = router.pathname.startsWith("/admin/") ? Admin : Fragment;
	const Layout = Component.layout || AdminLayout;

	const Common = (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ApolloProvider client={apolloClient}>
					<ThemeProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ThemeProvider>
				</ApolloProvider>
			</Hydrate>
		</QueryClientProvider>
	);
	return (
		<CacheProvider value={emotionCache}>
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
		</CacheProvider>
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
