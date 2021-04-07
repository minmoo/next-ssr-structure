import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import { Fragment, useEffect } from "react";
import { wrapper } from "../store";
import { CssBaseline } from "@material-ui/core";
import ThemeProvider from "../styles/ThemeProvider";
import GlobalStyles from "../styles/GlobalStyles";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import type { Page } from "../types/page";
import { cookieStringToObject } from "../lib/utils/cookie";
import axios from "../lib/api";
import { checkAPI } from "../lib/api/auth/check";
import { actions as authActions } from "../store/auth";
import Admin from "../layout/Admin";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

type Tprops = AppProps & {
	Component: Page;
};

const MyApp = ({ Component, pageProps, router }: Tprops) => {
	useEffect(() => {
		//서버사이드에서 삽입한 CSS를 제거
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	// Apollo (SSG, SSR)
	const apolloClient = useApollo(pageProps.initialApolloState);

	const AdminLayout = router.pathname.startsWith("/admin/") ? Admin : Fragment;
	const Layout = Component.layout || AdminLayout;

	const transition = {
		type: "spring",
		damping: 20,
		stiffness: 100,
		when: "afterChildren",
	};

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1"
				/>
			</Head>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider>
					<GlobalStyles />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
};

MyApp.getInitialProps = async (context: AppContext) => {
	const appInitialProps = await App.getInitialProps(context);
	const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

	const { store } = context.ctx;
	const { isLogged } = store.getState().auth;

	try {
		if (!isLogged && cookieObject.access_token) {
			axios.defaults.headers.cookie = cookieObject.access_token;
			const { data } = await checkAPI();
			store.dispatch(authActions.setLoggedUser(data));
		}
	} catch (e) {
		console.log(e);
	}

	return { ...appInitialProps };
};

//redux store, redux-saga를 컴포넌트에 전달
export default wrapper.withRedux(withReduxSaga(MyApp));
