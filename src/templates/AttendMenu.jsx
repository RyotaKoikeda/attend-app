import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";

const AttendMenu = () => {
  const dispatch = useDispatch();

  return (
    <main className="main">
      <div className="container">
        <h2 className="page-title">メニュー</h2>
        <p onClick={() => dispatch(push("/"))}>ホームへ戻る</p>
        <p onClick={() => dispatch(push("/staff/edit"))}>スタッフ追加</p>
        <p onClick={() => dispatch(push("/attend/edit"))}>スケジュール管理</p>
        <p onClick={() => dispatch(signOut())}>サインアウト</p>
      </div>
    </main>
  );
};

export default AttendMenu;
