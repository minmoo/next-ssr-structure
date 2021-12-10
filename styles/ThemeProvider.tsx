import { MuiThemeProvider } from "@material-ui/core";
import themeMap from "./theme/base";
import { TthemeKey, THEME, TthemeType } from "./types";
import useLocalStorage from "../store/useLocalStorage";

// export default useMemo(() => getMuiTheme(type), [type]);
const ThemeProvider: React.FC = (props) => {
	const [theme, _setTheme] = useLocalStorage<TthemeKey>(
		"appTheme",
		THEME.INDIGO,
	);
	const [type, _setType] = useLocalStorage<TthemeType>("appThemeType", "light");

	const currentTheme = Object.values(THEME).includes(theme)
		? themeMap[theme](type)
		: themeMap[THEME.INDIGO](type);

	return (
		<MuiThemeProvider theme={currentTheme}>{props.children}</MuiThemeProvider>
	);
};

export default ThemeProvider;
