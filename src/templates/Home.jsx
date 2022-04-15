import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { PrimaryButton, TextInput } from "../components/UiKit";
import { AttendText } from "../components/Attend";
import { StaffCard } from "../components/Staffs";
import { getStaffs } from "../reducks/staffs/selectors";
import { signIn, signOut } from "../reducks/users/operations";
import { getIsSignedIn } from "../reducks/users/selectors";
import { fetchStaffs } from "../reducks/staffs/operations";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import WidgetsIcon from "@material-ui/icons/Widgets";
import ScheduleIcon from "@material-ui/icons/Schedule";
import arrow from "../assets/images/arrow-bk.png";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 48,
    gap: 22,
  },
  button: {
    background: theme.palette.primary.light,
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const staffs = getStaffs(selector);
  const isSignedIn = getIsSignedIn(selector);

  const [dateId, setDateId] = useState(0),
    [attendIn, setAttendIn] = useState([]),
    [attendOut, setAttendOut] = useState([]),
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
      setAttendIn((prevState) => [...prevState, staff.attendIn]);
      setAttendOut((prevState) => [...prevState, staff.attendOut]);
    });
  }, [staffs]);

  return (
    <main className="main">
      <div className="container">
        {!isSignedIn && (
          <>
            <div className="page-logo">
              <LockIcon />
            </div>
            <h2 className="page-title">サインイン</h2>
            <div className="form-wrap">
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
              <div className="spacer-small" />
              <div className="center">
                <PrimaryButton label={"サインイン"} onClick={() => dispatch(signIn(email, password))} />
              </div>
              <div className="spacer-small" />
              <div className="center">
                <p>メールアドレス admin@gmail.com</p>
                <div className="spacer-small" />
                <p>パスワード Admin0123</p>
              </div>
            </div>
          </>
        )}
        {isSignedIn && (
          <>
            <div className="page-logo">
              <WidgetsIcon />
            </div>
            <h2 className="page-title">メニュー</h2>
            <Box className={classes.menu}>
              <Button className={classes.button} onClick={() => dispatch(push("/staff/edit"))}>
                スタッフ追加
              </Button>
              <Button className={classes.button} onClick={() => dispatch(push("/attend/edit"))}>
                スケジュール管理
              </Button>
              <Button className={classes.button} onClick={() => dispatch(signOut())}>
                サインアウト
              </Button>
            </Box>
          </>
        )}
        <div className="spacer-large" />
        <div className="page-logo">
          <ScheduleIcon />
        </div>
        <h2 className="page-title">出勤情報</h2>
        <div className="section-container">
          <TableContainer component={Paper}>
            <Table className="section-table" aria-label="simple table">
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
                    <TableRow key={staff.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <StaffCard id={staff.id} name={staff.name} images={staff.images} />
                      </TableCell>
                      {dateList.map((date, id) => (
                        <TableCell key={id} align="right">
                          <AttendText attend={attendIn} label={"出勤時間"} staff={staffId} staffs={staffs} date={date} />
                          <AttendText attend={attendOut} label={"退勤時間"} staff={staffId} staffs={staffs} date={date} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="arrowLeft">
            <IconButton onClick={() => setDateId(dateId - 7)}>
              <img src={arrow} alt="arrow" />
            </IconButton>
          </div>
          <div className="arrowRight">
            <IconButton onClick={() => setDateId(dateId + 7)}>
              <img src={arrow} alt="arrow" />
            </IconButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
