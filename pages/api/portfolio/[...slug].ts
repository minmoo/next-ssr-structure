/*
 	/page/[page-id].js will match with routes like /page/1 or /page/2, but not /page/1/2
	/page/[...slug].js will match with routes like /page/1/2, but not /page/
	/page/[[...slug]].js will match with routes like /page/1/2 and /page/
*/
import { connectToDatabase } from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query;
	// slug의 첫번째는 COLLECTION
	const collection = slug[0];

	const { db } = await connectToDatabase();
	switch (req.method) {
		case "GET":
			const result = await db.collection(collection).find({}).toArray();
			res.status(200).json({ result });
			break;
	}
};
