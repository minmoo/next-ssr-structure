//환경변수 설정을 위해 제일 먼저 실행한다.
//import 할 경우 dotenv.config를 실행하기 전 까지는 환경변수 설정이 안되기 때문에 require 사용
require("dotenv").config({
	path: require("path").resolve(
		process.cwd(),
		process.env.NODE_ENV === "development"
			? ".env.development"
			: ".env.production",
	),
});
import express, { Request, Response } from "express";
import next from "next";
import Logger from "./lib/log/logger";
import morganMiddleware from "./lib/log/morganMiddleware";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev }); //use next module
const handle = app.getRequestHandler();
const port = process.env.PORT || 7008;

app.prepare().then(() => {
	const server = express();

	// HTTP logger middleware
	server.use(morganMiddleware);

	server.get("/logger", (_, res: Response) => {
		Logger.info("logger");
		Logger.error("error");
		res.send("logger");
	});

	/*
  Next Process
  */

	server.all("*", (req: Request, res: Response) => {
		return handle(req, res);
	});

	server.listen(port, (err?: any) => {
		if (err) throw err;
		console.log(`
          ################################################
          🛡️  Server listening on port: ${port} 🛡️ 
          🛡️  env: ${process.env.NODE_ENV}       🛡️
          ################################################
        `);
	});
});
