import { AppProps } from "next/app";
import { Fragment, useEffect } from "react";
import { wrapper } from "../store";
import ThemeProvider from "../styles/ThemeProvider";
import GlobalStyles from "../styles/GlobalStyles";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import type { Page } from "../types/page";
import Admin from "../layout/Admin";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { StyledEngineProvider } from "@mui/material/styles";

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

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1"
				/>
			</Head>
			<SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
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
			</SessionProvider>
		</>
	);
};

//redux store, redux-saga를 컴포넌트에 전달
export default wrapper.withRedux(withReduxSaga(MyApp));
