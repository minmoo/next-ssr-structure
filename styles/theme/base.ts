import { Tthemes } from "../types";
import getIndigoTheme from "./indigo";
import getGreyTheme from "./grey";
import getMainTheme from "./main";
const themeMap: Tthemes = {
	indigo: getIndigoTheme,
	grey: getGreyTheme,
	main: getMainTheme,
};

export default themeMap;
