import useLocalStorage from "@/store/useLocalStorage";
import themeMap from "@/styles/theme/base";
import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import { Theme } from "@mui/material";
export const THEME = {
	INDIGO: "indigo",
	GREY: "grey",
	MAIN: "main",
} as const;

export type TthemeKey = typeof THEME[keyof typeof THEME];
export type Tthemes = { [key in TthemeKey]: (type: TthemeType) => Theme };

export type TthemeType = "light" | "dark";

const ResponsiveThemeProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [theme, _setTheme] = useLocalStorage<TthemeKey>("appTheme", THEME.MAIN);
	const [type, _setType] = useLocalStorage<TthemeType>("appThemeType", "light");

	const currentTheme = Object.values(THEME).includes(theme)
		? themeMap[theme](type)
		: themeMap[THEME.MAIN](type);

	const respoonsiveTheme = responsiveFontSizes(currentTheme);
	return <ThemeProvider theme={respoonsiveTheme}>{children}</ThemeProvider>;
};

export default ResponsiveThemeProvider;
