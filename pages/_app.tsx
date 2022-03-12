import { AppProps } from "next/app";
import React, { Fragment, useEffect } from "react";
import { wrapper } from "../store";
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
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ResponsiveThemeProvider from "@/components/mui/ResponsiveThemeProvider";
import axios from "@/lib/api";
import ConfirmProvider from "@/lib/context/ConfirmContext";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import CustomDialog from "@/components/mui/modal/CustomDialog";
import ErrorBoundary from "@/components/ErrorBoundary";

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
	// 전체에서 공용으로 사용하는 Query
	// query key만으로 사용 가능하다.
	const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
		const [{ scope }] = queryKey;
		if (scope) {
			const { data } = await axios.get(`/api/portfolio/${scope}`);
			return data;
		}
		throw new Error("Invalid QueryKey");
	};

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5000, //5초 동안 query 유지
						queryFn: defaultQueryFn,
					},
				},
			}),
	);

	const AdminLayout = router.pathname.startsWith("/admin/") ? Admin : Fragment;
	const Layout = Component.layout || AdminLayout;

	const Common = (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ApolloProvider client={apolloClient}>
					<ResponsiveThemeProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<SnackbarProvider>
							<ConfirmProvider>
								<Layout>
									<CustomDialog />
									<Component {...pageProps} />
								</Layout>
							</ConfirmProvider>
						</SnackbarProvider>
					</ResponsiveThemeProvider>
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
			<ErrorBoundary>
				{/* refetchInterval은 session maxAge보다 큰 값이여야한다.(아니면 session 계속 유지된다.) */}
				<SessionProvider session={pageProps.session} refetchInterval={10 * 6}>
					{Component.auth ? (
						<Auth {...Component.auth}>{Common}</Auth>
					) : (
						<>{Common}</>
					)}
				</SessionProvider>
			</ErrorBoundary>
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
