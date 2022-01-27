import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../reducks/users/operations";

const AttendEdit = () => {
  const dispatch = useDispatch();

  return (
    <section>
      <h2 className="u-text__headline u-text-center">edit</h2>
      <div className="c-section-container">
        <p onClick={() => dispatch(push("/staff/edit"))}>スタッフ追加</p>
        <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
      </div>
    </section>
  );
};

export default AttendEdit;
