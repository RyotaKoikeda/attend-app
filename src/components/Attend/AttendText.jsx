import React, { useEffect, useState } from "react";

const AttendText = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let selectId = props.attend[props.staff];
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

  return <p>{value}</p>;
};

export default AttendText;
