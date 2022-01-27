import React, { useEffect } from "react";
import { StaffCard } from "../components/Staffs";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";
import { fetchStaffs } from "../reducks/staffs/operations";
import { getStaffs } from "../reducks/staffs/selectors";

const AttendEdit = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const staffs = getStaffs(selector);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline u-text-center">edit</h2>
      <div className="c-section-container">
        <p onClick={() => dispatch(push("/staff/edit"))}>スタッフ追加</p>
        <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
        {staffs.length > 0 &&
          staffs.map((staff) => (
            <StaffCard
              key={staff.id}
              id={staff.id}
              name={staff.name}
              images={staff.images}
            />
          ))}
      </div>
    </section>
  );
};

export default AttendEdit;
