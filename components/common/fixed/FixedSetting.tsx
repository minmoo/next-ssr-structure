import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, ChangeEvent, useContext } from "react";
import {
  Box,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { indigo, blueGrey } from "@material-ui/core/colors";
import useLocalStorage from "../../../store/useLocalStorage";
import { THEME, TthemeKey } from "../../../styles/types";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "fixed",
      top: 180,
      right: 0,
      width: 40,
      background: "rgba(0, 0, 0, 0.3)",
      justifyContent: "center",
      zIndex: 100,
    },
    indigoRadio: {
      color: indigo[400],
      "&$checked": {
        color: indigo[600],
      },
    },
    blueGreyRadio: {
      color: blueGrey[400],
      "&$checked": {
        color: blueGrey[600],
      },
    },
    box: {
      right: 50,
      left: "auto",
      padding: "10px",
      position: "absolute",
      display: "inline-block",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    },
    checked: {},
  })
);

type TFixedSettingProps = {};

export default function FixedSetting(
  props: TFixedSettingProps
): React.ReactElement {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage<TthemeKey>(
    "appTheme",
    THEME.INDIGO
  );

  const handleClick = () => {
    setOpen(!isOpen);
  };
  const hadleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as TthemeKey);
  };

  return (
    <Box className={classes.root}>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      {isOpen && (
        <Box className={classes.box}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Theme</FormLabel>
            <RadioGroup
              aria-label="theme"
              name="theme"
              value={theme}
              onChange={hadleChangeTheme}
            >
              <FormControlLabel
                value="indigo"
                control={
                  <Radio
                    classes={{
                      root: classes.indigoRadio,
                      checked: classes.checked,
                    }}
                  />
                }
                label="indigo"
              />
              <FormControlLabel
                value="blueGrey"
                control={
                  <Radio
                    classes={{
                      root: classes.blueGreyRadio,
                      checked: classes.checked,
                    }}
                  />
                }
                label="blueGrey"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
