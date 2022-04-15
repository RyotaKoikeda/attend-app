import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { signOut } from "../../reducks/users/operations";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0 16px",
  },
  button: {
    background: theme.palette.primary.light,
  },
}));

const HeaderMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  return (
    <Box className={classes.menu}>
      {isSignedIn && (
        <ButtonGroup variant="contained" aria-label="large text button group">
          <Button className={classes.button} onClick={() => dispatch(push("/staff/edit"))}>
            スタッフ追加
          </Button>
          <Button className={classes.button} onClick={() => dispatch(push("/attend/edit"))}>
            スケジュール管理
          </Button>
          <Button className={classes.button} onClick={() => dispatch(signOut())}>
            サインアウト
          </Button>
        </ButtonGroup>
      )}
      {!isSignedIn && (
        <ButtonGroup variant="contained" aria-label="large text button group">
          <Button className={classes.button} onClick={() => dispatch(push("/"))}>
            サインイン
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};

export default HeaderMenu;
