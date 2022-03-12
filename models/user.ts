import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface ModelUser {
	_id?: number;
	id: string;
	password: string;
}

const schema = new Schema<ModelUser>({
	id: {
		type: String,
		required: [true, "required"],
	},
	password: {
		type: String,
		required: [true, "required"],
		minlength: 7,
	},
});

/* Hashing password */
schema.pre("save", function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;
	const saltFactor = 10; //암호화된 문구 길이
	//model 안의 paswsword가 변환될때만 암호화
	if (user.isModified("password")) {
		bcrypt.genSalt(saltFactor, (err, salt) => {
			// Salt 생성
			if (err) return next(err);

			bcrypt.hash(user.password, salt, (err, hash) => {
				// Hash생성
				if (err) return next(err);
				user.password = hash; // Hash값 pwd에 저장
				next();
			});
		});
	}
});

schema.methods.comparePassword = function (plainPassword: string) {
	//plainPassword를 암호화해서 현재 비밀번호화 비교
	return bcrypt
		.compare(plainPassword, this.password)
		.then((isMatch) => isMatch)
		.catch((err) => err);
};

export default models.User || model<ModelUser>("User", schema);
