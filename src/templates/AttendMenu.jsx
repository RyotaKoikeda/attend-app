import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";

const AttendMenu = () => {
  const dispatch = useDispatch();

  return (
    <section>
      <div className="container">
        <h2 className="u-text__headline u-text-center">menu</h2>
        <p onClick={() => dispatch(push("/"))}>HOMEへ戻る</p>
        <p onClick={() => dispatch(push("/staff/edit"))}>スタッフ追加</p>
        <p onClick={() => dispatch(push("/attend/edit"))}>スケジュール管理</p>
        <p onClick={() => dispatch(signOut())}>SIGN OUT</p>
      </div>
    </section>
  );
};

export default AttendMenu;
