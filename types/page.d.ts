import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";

export type Role = "admin" | "guest";

export type Page<P = {}> = NextPage<P> & {
	layout?: ComponentType;
	auth?: {
		role?: Role;
		loading?: JSX.Element; //loading 일 때 컴포넌트
	};
};
