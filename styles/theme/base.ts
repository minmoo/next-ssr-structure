import { Tthemes } from "../types";
import getIndigoTheme from "./indigo";
import getGreyTheme from "./grey";
const themeMap: Tthemes = {
	indigo: getIndigoTheme,
	grey: getGreyTheme,
};

export default themeMap;
