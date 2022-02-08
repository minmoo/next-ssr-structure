import { Schema, model, models } from "mongoose";

export interface ModelExperience {
	_id?: number;
	company: string;
	period: string[];
	role: string;
	image: string;
}

const schema = new Schema<ModelExperience>({
	company: {
		type: String,
		required: [true, "required"],
		maxlength: [20, "maxlength"],
	},
	period: {
		type: [String],
		required: [true, "required"],
	},
	role: {
		type: String,
		required: [true, "required"],
	},
	image: {
		type: String,
		required: [true, "required"],
	},
});

export default models.Experience ||
	model<ModelExperience>("Experience", schema);
