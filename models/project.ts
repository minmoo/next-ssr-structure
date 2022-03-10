import { Schema, model, models } from "mongoose";

export interface ModelProject {
	_id?: number;
	title: string;
	desc: string;
	image: string;
	skills: string[];
	notionId: string;
}

const schema = new Schema<ModelProject>({
	title: {
		type: String,
		required: [true, "required"],
		maxlength: [20, "maxlength"],
	},
	desc: {
		type: String,
		required: [true, "required"],
	},
	image: {
		type: String,
		required: [true, "required"],
	},
	skills: {
		type: [String],
		required: [true, "required"],
	},
	notionId: {
		type: String,
		required: [true, "required"],
	},
});

export default models.Project || model<ModelProject>("Project", schema);
