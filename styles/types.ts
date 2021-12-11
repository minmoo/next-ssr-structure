import { Theme } from "@mui/material";
export const THEME = {
	INDIGO: "indigo",
	GREY: "grey",
} as const;

export type TthemeKey = typeof THEME[keyof typeof THEME];
export type Tthemes = { [key in TthemeKey]: (type: TthemeType) => Theme };

export type TthemeType = "light" | "dark";
