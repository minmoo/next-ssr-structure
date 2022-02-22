/*
 	/page/[page-id].js will match with routes like /page/1 or /page/2, but not /page/1/2
	/page/[...slug].js will match with routes like /page/1/2, but not /page/
	/page/[[...slug]].js will match with routes like /page/1/2 and /page/
*/
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Experience, { ModelExperience } from "models/experience";
import Project, { ModelProject } from "models/project";
import Skill, { ModelSkill } from "models/skill";
import Tool, { ModelTool } from "models/tool";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query;
	// slug의 첫번째는 COLLECTION
	const collection = slug[0];
	await dbConnect();

	const handleGetModel: { [key: string]: any } = {
		experience: () => Experience.find({}),
		project: () => Project.find({}),
		skill: () => Skill.find({}),
		tool: () => Tool.find({}),
	};

	const handlePostModel: { [key: string]: any } = {
		experience: (data: ModelExperience) => Experience.insertMany(data),
		project: (data: ModelProject) => Project.insertMany(data),
		skill: (data: ModelSkill) => Skill.insertMany(data),
		tool: (data: ModelTool) => Tool.insertMany(data),
	};

	const handlePutModel: { [key: string]: any } = {
		experience: (data: ModelExperience) =>
			Experience.findOneAndReplace({ _id: data._id }, data),
		project: (data: ModelProject) =>
			Project.findOneAndReplace({ _id: data._id }, data),
		skill: (data: ModelSkill) =>
			Skill.findOneAndReplace({ _id: data._id }, data),
		tool: (data: ModelTool) => Tool.findOneAndReplace({ _id: data._id }, data),
	};

	const handleDeleteModel: { [key: string]: any } = {
		experience: (id: string) => Experience.deleteOne({ _id: id }),
		project: (id: string) => Project.deleteOne({ _id: id }),
		skill: (id: string) => Skill.deleteOne({ _id: id }),
		tool: (id: string) => Tool.deleteOne({ _id: id }),
	};

	switch (req.method) {
		case "GET":
			const result = await handleGetModel[collection]();
			res.status(200).json(result);
			break;

		case "POST":
			await handlePostModel[collection](req.body);
			res.status(200).json({ message: "success" });
			break;

		case "PUT":
			await handlePutModel[collection](req.body);
			res.status(200).json({ message: "success" });
			break;

		case "DELETE":
			await handleDeleteModel[collection](req.query.id);
			res.status(200).json({ message: "success" });
			break;
	}
};
