import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();

	if (req.method === "POST") {
		User.findOne({ id: process.env.ADMIN_ID }, (err: any, user: any) => {
			if (err) return res.status(500).json({ error: err });

			if (!user) {
				const userData = {
					id: process.env.ADMIN_ID,
					password: process.env.ADMIN_PWD,
				};

				User.create(userData, (err, user) => {
					if (err) return res.status(500).json({ error: err });

					return res.status(200).json({ message: "success" });
				});
			} else {
				res.status(500).json({ error: "duplicate user" });
			}
		});
	}
};
