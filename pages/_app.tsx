import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import { useEffect } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
const app = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    //서버사이드에서 삽입한 CSS를 제거
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

//redux store를 컴포넌트에 전달
export default wrapper.withRedux(app);
