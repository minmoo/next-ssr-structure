import { Schema, model, models } from "mongoose";

export interface ModelSkill {
	_id?: number;
	title: string;
	category: string;
	icon: string;
	proficient: number;
}

const schema = new Schema<ModelSkill>({
	category: {
		type: String,
		required: [true, "required"],
		maxlength: [20, "maxlength"],
	},
	title: {
		type: String,
		required: [true, "required"],
	},
	icon: {
		type: String,
		required: [true, "required"],
	},
	proficient: {
		type: Number,
		required: [true, "required"],
	},
});

export default models.Skill || model<ModelSkill>("Skill", schema);
