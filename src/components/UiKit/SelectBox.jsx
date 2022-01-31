import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  FormControl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

const SelectBox = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const inputDate = (event, id, date) => {
    let selectId = props.attend[id];
    let selectDate = { id: date, name: event };
    if (!selectId.find((v) => v.id === date)) {
      selectId.push(selectDate);
    } else {
      const targetValue = selectId.find((v) => v.id === date);
      targetValue.name = event;
    }
    const targetValue = selectId.find((v) => v.id === date);
    setValue(targetValue.name);
  };

  useEffect(() => {
    let selectId = props.attend[props.staff];
    if (!selectId) {
    } else {
      const targetValue = selectId.find((v) => v.id === props.date);
      if (targetValue) {
        setValue(targetValue.name);
      } else {
        setValue("");
      }
    }
    console.log(props.attend);
  }, [props.date, props.attend, props.staffs]);

  return (
    <FormControl className={classes.FormControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={value}
        onChange={(event) =>
          inputDate(event.target.value, props.staff, props.date)
        }
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
