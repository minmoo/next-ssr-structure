import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Grid, Grow, Paper, Typography } from "@material-ui/core";
import GridContainer from "../components/common/grid/GridContainer";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      height: "100vh",
    },
    paper: {
      margin: theme.spacing(10, 5),
      borderRadius: "15px",
      display: "flex",
    },
    input: {
      margin: theme.spacing(4, 4, 4),
      width: "20vw",
      minWidth: "400px",
      minHeight: "550px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    side: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      width: "50vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
    },
    sideTitle: {
      margin: theme.spacing(10, 10),
      color: theme.palette.getContrastText(theme.palette.secondary.main),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
  })
);

type TAuthProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: TAuthProps): React.ReactElement {
  const classes = useStyles();

  return (
    <GridContainer
      justify="center"
      alignItems="center"
      className={classes.main}
    >
      <Paper elevation={6} className={classes.paper}>
        <div className={classes.input}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {children}
        </div>
        <div className={classes.side}>
          <Grow in={true} {...{ timeout: 1000 }}>
            <Typography variant="h1" className={classes.sideTitle}>
              Welcome
              <br /> to the
              <br /> Back Office
            </Typography>
          </Grow>
        </div>
      </Paper>
    </GridContainer>
  );
}
