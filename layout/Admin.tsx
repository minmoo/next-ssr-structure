import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Navbar from "../components/common/navbar/AdminNavbar";
import Toolbar from "../components/common/toolbar/AdminToolbar";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      //   display: "flex",
      ...theme.mixins.toolbar,
    },
    wrapper: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
    },
    contentContainer: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
    },
    content: {
      flex: "1 1 auto",
      height: "100%",
      overflow: "auto",
      padding: theme.spacing(3),
    },
  })
);

type TadminProps = {
  children: React.ReactNode;
};

export default function Admin({ children }: TadminProps): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar />
      <Navbar />
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router routes={routes} />
      </main> */}

      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
