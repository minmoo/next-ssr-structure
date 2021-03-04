import { MuiThemeProvider } from "@material-ui/core";
import { createContext, useState } from "react";
import themeMap from "./base";
import { TthemeKey, THEME } from "./types";
import useLocalStorage from "../store/useLocalStorage";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ThemeContext = createContext((themeName: TthemeKey): void => {});

const ThemeProvider: React.FC = (props) => {
  const [theme, _setTheme] = useLocalStorage<TthemeKey>(
    "appTheme",
    THEME.INDIGO
  );

  const currentTheme = Object.values(THEME).includes(theme)
    ? themeMap[theme]
    : themeMap[THEME.INDIGO];

  return (
    <ThemeContext.Provider value={_setTheme}>
      <MuiThemeProvider theme={currentTheme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
