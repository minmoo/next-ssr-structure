import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "middleware/withAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	return res.send("성공입니다.");
};

export default withAuth(handler);
