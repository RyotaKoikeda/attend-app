import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UiKit";
import { useDispatch, useSelector } from "react-redux";
import { getStaffs } from "../reducks/staffs/selectors";
import { signIn } from "../reducks/users/operations";
import { fetchStaffs } from "../reducks/staffs/operations";
import { StaffCard } from "../components/Staffs";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AttendText } from "../components/Attend";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const staffs = getStaffs(selector);

  const [dateId, setDateId] = useState(0),
    [attend, setAttend] = useState([]),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

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

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

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
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">サインイン</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"password"}
          onChange={inputPassword}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"Sign in"}
            onClick={() => dispatch(signIn(email, password))}
          />
          <div className="module-spacer--medium" />
        </div>
        <div>
          <p>メールアドレス admin@gmail.com</p>
          <p>パスワード admin123</p>
        </div>
      </div>
      <div className="container">
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
                  <TableCell key={id} align="center">
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
                        <AttendText
                          attend={attend}
                          staff={staffId}
                          staffs={staffs}
                          date={date}
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

export default Home;
