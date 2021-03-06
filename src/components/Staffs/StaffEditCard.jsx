import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NoImage from "../../assets/images/no-img.png";
import { deleteStaff } from "../../reducks/staffs/operations";

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
  moreIcon: {
    marginLeft: "auto",
  },
}));

const StaffEditCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={images[0].path} title="" onClick={() => dispatch(push("/staff/edit/" + props.id))} />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push("/staff/edit/" + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
        </div>
        <IconButton onClick={handleClick} className={classes.moreIcon}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              dispatch(push("/staff/edit/" + props.id));
              handleClose();
            }}
          >
            ????????????
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteStaff(props.id));
              handleClose();
            }}
          >
            ????????????
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default StaffEditCard;
