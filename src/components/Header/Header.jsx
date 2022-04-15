import React from "react";
import { HeaderMenu } from "./";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
      flexDirection: "column",
      padding: "16px 20px",
      gap: "8px",
    },
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      flexDirection: "row",
      padding: "0 40px",
    },
  },
  logo: {
    marginTop: 8,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <h1 className={`gothic ${classes.logo}`} onClick={() => dispatch(push("/"))}>
            attend app
          </h1>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
