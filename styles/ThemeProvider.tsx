import { ThemeProvider } from "@mui/material/styles";
import themeMap from "./theme/base";
import { TthemeKey, THEME, TthemeType } from "./types";
import useLocalStorage from "../store/useLocalStorage";

// export default useMemo(() => getMuiTheme(type), [type]);
const MuiThemeProvider: React.FC = (props) => {
	const [theme, _setTheme] = useLocalStorage<TthemeKey>(
		"appTheme",
		THEME.INDIGO,
	);
	const [type, _setType] = useLocalStorage<TthemeType>("appThemeType", "light");

	const currentTheme = Object.values(THEME).includes(theme)
		? themeMap[theme](type)
		: themeMap[THEME.INDIGO](type);

	return <ThemeProvider theme={currentTheme}>{props.children}</ThemeProvider>;
};

export default MuiThemeProvider;
