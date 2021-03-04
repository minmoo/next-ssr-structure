import { Theme } from "@material-ui/core";
export const THEME = {
  BLUEGREY: "blueGrey",
  INDIGO: "indigo",
} as const;

export type TthemeKey = typeof THEME[keyof typeof THEME];
export type Tthemes = { [key in TthemeKey]: Theme };
