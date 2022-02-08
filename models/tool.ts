import { Schema, model, models } from "mongoose";

export interface ModelTool {
	_id?: number;
	title: string;
	icon: string;
}

const schema = new Schema<ModelTool>({
	title: {
		type: String,
		required: [true, "required"],
	},
	icon: {
		type: String,
		required: [true, "required"],
	},
});

export default models.Tool || model<ModelTool>("Tool", schema);
