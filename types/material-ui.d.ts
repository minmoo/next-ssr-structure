import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
  export interface Theme {
    custom: {
      sidebar: {
        width: number;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  export interface ThemeOptions {
    custom: {
      sidebar: {
        width: number;
      };
    };
  }
}
