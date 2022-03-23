import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: 256,
    height: 48,
    marginBottom: 16,
    color: "#000",
    fontSize: 16,
    backgroundColor: "#ffcd83",
  },
});

const PrimaryButton = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => props.onClick()}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default PrimaryButton;
