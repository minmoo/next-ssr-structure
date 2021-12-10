import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../../lib/data/user";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { userId, password, name } = req.body;
		if (!userId || !password || !name) {
			res.statusCode = 400;
			return res.send("필수 데이터가 없습니다.");
		}

		const userExist = Data.user.exist({ id: userId });
		if (userExist) {
			res.statusCode = 409;
			return res.send("이미 가입된 ID 입니다.");
		}

		const hashedPassword = bcrypt.hashSync(password, 8);

		const newUser: StoredUserType = {
			userId,
			password: hashedPassword,
			name,
		};

		Data.user.write(newUser);

		await new Promise((resolve) => {
			const token = jwt.sign(newUser.userId, process.env.JWT_SECRET!);
			res.setHeader(
				"Set-Cookie",
				`access_token=${token}; path=/; expires=${new Date(
					Date.now() + 60 * 60 * 24 * 1000 * 1, //1일
				)}; httponly`,
			);
			resolve(token);
		});

		const newUserWithoutPassword: Partial<
			Pick<StoredUserType, "password">
		> = newUser;
		delete newUserWithoutPassword.password;

		res.statusCode = 200;
		return res.send(newUser);
	}

	res.statusCode = 405;
	return res.end();
};
