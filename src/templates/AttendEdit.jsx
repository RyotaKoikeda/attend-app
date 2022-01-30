import React, { useCallback, useEffect, useState } from "react";
import { StaffCard } from "../components/Staffs";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";
import { fetchStaffs } from "../reducks/staffs/operations";
import { getStaffs } from "../reducks/staffs/selectors";
import moment from "moment";
import { SelectBox } from "../components/UiKit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const AttendEdit = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const staffs = getStaffs(selector);

  const [dateId, setDateId] = useState(0),
    [attend, setAttend] = useState([]);

  const categories = [
    { id: "12:00", name: "12:00" },
    { id: "13:00", name: "13:00" },
    { id: "14:00", name: "14:00" },
    { id: "15:00", name: "15:00" },
    { id: "16:00", name: "16:00" },
    { id: "17:00", name: "17:00" },
    { id: "18:00", name: "18:00" },
    { id: "19:00", name: "19:00" },
    { id: "20:00", name: "20:00" },
  ];

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

  useEffect(() => {
    staffs.map((staff) => {
      setAttend((prevState) => [...prevState, staff.attend]);
    });
  }, [staffs]);

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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {dateList.map((date, id) => (
                  <TableCell key={id} align="right">
                    {date}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.length > 0 &&
                staffs.map((staff, staffId) => (
                  <TableRow
                    key={staff.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <StaffCard
                        id={staff.id}
                        name={staff.name}
                        images={staff.images}
                      />
                    </TableCell>
                    {dateList.map((date, id) => (
                      <TableCell key={id} align="right">
                        <SelectBox
                          attend={attend}
                          staff={staffId}
                          label={"出勤時間"}
                          date={date}
                          required={true}
                          options={categories}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default AttendEdit;
