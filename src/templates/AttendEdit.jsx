import React, { useCallback, useEffect, useState } from "react";
import { StaffCard } from "../components/Staffs";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";
import { fetchStaffs } from "../reducks/staffs/operations";
import { getStaffs } from "../reducks/staffs/selectors";
import moment from "moment";

const AttendEdit = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const staffs = getStaffs(selector);

  const [dateId, setDateId] = useState(0);

  const dateList = [];
  const weeksEn = [];
  [...Array(7)].map((_, id) => {
    dateList.push(
      moment()
        .add(dateId + id, "days")
        .format("MM/DD")
    );
    weeksEn.push(
      moment()
        .add(dateId + id, "days")
        .format("ddd")
    );
  });

  useEffect(() => {
    dispatch(fetchStaffs());
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="u-text__headline u-text-center">edit</h2>
        <p onClick={() => dispatch(push("/staff/edit"))}>スタッフ追加</p>
        <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
        <div className="p-grid__row"></div>
        <div className="p-grid__row">
          <p onClick={() => setDateId(dateId - 7)}>{"<"}</p>
          <p onClick={() => setDateId(dateId + 7)}>{">"}</p>
        </div>
        <div className="flex">
          <div>
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
          {dateList.map((date, id) => (
            <div key={id}>
              <div>{date}</div>
              {staffs.map((staff, id) => (
                <input key={id} type="checkbox" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttendEdit;
