import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	throw new Error("API throw Error Test2");
	res.status(200).json({ id: "minsu" });
};

export default withSentry(handler);
