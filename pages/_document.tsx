import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import createEmotionCache from "styles/createEmotionCache";
import React from "react";
import createEmotionServer from "@emotion/server/create-instance";

class MyDocument extends Document {
	/**
	 * On the server:
	 * 1. app.getInitialProps
	 * 2. page.getInitialProps
	 * 3. document.getInitialProps
	 * 4. app.render
	 * 5. page.render
	 * 6. document.render
	 *
	 * On the server with Error:
	 * 1. document.getInitialProps
	 * 2. app.render
	 * 3. page.render
	 * 4. document.render
	 *
	 * On the client
	 * 1. app.getInitialProps
	 * 2. page.getInitialProps
	 * 3. app.render
	 * 4. page.render
	 * @param ctx
	 * @returns
	 */
	// `getInitialProps` belongs to `_document` (instead of `_app`),
	// it's compatible with static-site generation (SSG).
	static async getInitialProps(ctx: DocumentContext) {
		//Render app and page and get the context of the page with collected side effects
		const originalRenderPage = ctx.renderPage;

		// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
		// However, be aware that it can have global side effects.
		const cache = createEmotionCache();
		const { extractCriticalToChunks } = createEmotionServer(cache);

		/* eslint-disable */
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App: any) => (props) =>
					<App emotionCache={cache} {...props} />,
			});
		/* eslint-enable */

		const initialProps = await Document.getInitialProps(ctx);

		// This is important. It prevents emotion to render invalid HTML.
		// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
		const emotionStyles = extractCriticalToChunks(initialProps.html);
		const emotionStyleTags = emotionStyles.styles.map((style) => (
			<style
				data-emotion={`${style.key} ${style.ids.join(" ")}`}
				key={style.key}
				dangerouslySetInnerHTML={{ __html: style.css }}
			/>
		));
		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [
				...React.Children.toArray(initialProps.styles),
				...emotionStyleTags,
			],
		};
	}

	render() {
		return (
			<Html lang="ko">
				<Head>
					{/* PWA primary color */}
					{/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
					<meta name="title" content="next framwork" />
					<meta name="description" content="next framework description" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					{/* Font add */}
					<link // MUI5 using ROboto font(essential)
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean"
						rel="stylesheet"
					/>
					{/* Map */}
					<script
						type="text/javascript"
						src={
							"//dapi.kakao.com/v2/maps/sdk.js?appkey=5faf75d8630808c11f1a80f2448cc550&libraries=services"
						}
					/>
					{/* Inject MUI styles first to match with the prepend: true configuration. */}
					{(this.props as any).emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
