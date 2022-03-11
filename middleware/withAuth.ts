import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const withAuth = (handler: NextApiHandler) => {
	return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
		//GET은 통과
		if (req.method === "GET") {
			return handler(req, res);
		}

		const session = await getSession({ req });

		if (!session) {
			//not signed in
			res.status(401);
			return res.end();
		}

		if (session.user.role !== "admin") {
			res.status(401);
			return res.end();
		}

		return handler(req, res);
	};
};

export default withAuth;
