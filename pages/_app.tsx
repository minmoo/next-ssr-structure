import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />

      <Component {...pageProps} />
    </>
  );
};

//redux store를 컴포넌트에 전달
export default wrapper.withRedux(app);
