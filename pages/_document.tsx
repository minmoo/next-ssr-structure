import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

//MUI Core
import { ServerStyleSheets } from "@material-ui/styles";
//Styled Component
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const muiSheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(muiSheets.collect(<App {...props} />)),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
						{muiSheets.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="ko">
				<Head>
					<meta name="title" content="next framwork" />
					<meta name="description" content="next framework description" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					{/* Font add */}
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
