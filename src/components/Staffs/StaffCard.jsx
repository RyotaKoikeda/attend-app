import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from "../../assets/images/no-img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
}));

const StaffCard = (props) => {
  const classes = useStyles();

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={images[0].path} title="" />
      <CardContent className={classes.content}>
        <div>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;
