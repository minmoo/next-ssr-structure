export type TuserInfo = {
	userId: string;
	name: string;
};

export type TsignUp = TuserInfo & {
	password: string;
};

export type Tlogin = Pick<TsignUp, "userId" | "password">;

export type Tauth = TuserInfo & {
	isLogged: boolean;
};
