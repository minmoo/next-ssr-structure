import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import { useEffect } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import { motion, AnimatePresence } from "framer-motion";
import type { Page } from "../types/page";
import { cookieStringToObject } from "../lib/utils/cookie";
import axios from "../lib/api";
import { checkAPI } from "../lib/api/auth/check";
import { actions as authActions } from "../store/auth";

type Tprops = AppProps & {
  Component: Page;
};

const app = ({ Component, pageProps, router }: Tprops) => {
  useEffect(() => {
    //서버사이드에서 삽입한 CSS를 제거
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const Layout = Component.layout || (({ children }) => <>{children}</>);

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence>
          <motion.div
            transition={transition}
            key={router.pathname}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
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

//redux store를 컴포넌트에 전달
export default wrapper.withRedux(withReduxSaga(app));
