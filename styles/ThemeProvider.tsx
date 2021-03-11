import { MuiThemeProvider } from "@material-ui/core";
import { createContext, useMemo } from "react";
import themeMap from "./theme/base";
import { TthemeKey, THEME, TthemeType } from "./types";
import useLocalStorage from "../store/useLocalStorage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ThemeContext = createContext((themeName: TthemeKey): void => {});
// export default useMemo(() => getMuiTheme(type), [type]);
const ThemeProvider: React.FC = (props) => {
  const [theme, _setTheme] = useLocalStorage<TthemeKey>(
    "appTheme",
    THEME.INDIGO
  );
  const [type, _setType] = useLocalStorage<TthemeType>("appThemeType", "light");

  const currentTheme = Object.values(THEME).includes(theme)
    ? themeMap[theme](type)
    : themeMap[THEME.INDIGO](type);

  return (
    <ThemeContext.Provider value={_setTheme}>
      <MuiThemeProvider theme={currentTheme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
