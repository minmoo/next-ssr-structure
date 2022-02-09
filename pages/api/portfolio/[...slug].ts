/*
 	/page/[page-id].js will match with routes like /page/1 or /page/2, but not /page/1/2
	/page/[...slug].js will match with routes like /page/1/2, but not /page/
	/page/[[...slug]].js will match with routes like /page/1/2 and /page/
*/
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Experience from "models/experience";
import Project from "models/project";
import Skill from "models/skill";
import Tool from "models/tool";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query;
	// slug의 첫번째는 COLLECTION
	const collection = slug[0];
	await dbConnect();

	const handleModel: { [key: string]: any } = {
		experience: () => Experience.find({}),
		project: () => Project.find({}),
		skill: () => Skill.find({}),
		tool: () => Tool.find({}),
	};

	switch (req.method) {
		case "GET":
			const result = await handleModel[collection]();
			res.status(200).json(result);
			break;
	}
};
