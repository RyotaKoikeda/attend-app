import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AttendText = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const selectId = props.attend[props.staff];
    if (!selectId) {
    } else {
      const targetValue = selectId.find((v) => v.id === props.date);
      if (targetValue) {
        setValue(targetValue.name);
      } else {
        setValue("未定");
      }
    }
  }, [props.date, props.attend, props.staffs]);

  return (
    <List>
      <ListItem>
        <ListItemText primary={value} secondary={props.label} />
      </ListItem>
    </List>
  );
};

export default AttendText;
