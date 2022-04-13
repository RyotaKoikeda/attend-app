import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveStaff } from "../reducks/staffs/operations";
import { PrimaryButton, TextInput } from "../components/UiKit";
import { ImageArea } from "../components/Staffs";
import { db } from "../firebase";

const StaffEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/staff/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [attendIn, setAttendIn] = useState([]),
    [attendOut, setAttendOut] = useState([]),
    [name, setName] = useState(""),
    [images, setImages] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  useEffect(() => {
    if (id !== "") {
      db.collection("staffs")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setAttendIn(data.attendIn);
          setAttendOut(data.attendOut);
          setName(data.name);
          setImages(data.images);
        });
    }
  }, [id]);

  return (
    <main className="main">
      <div className="container">
        <h2 className="page-title">スタッフの登録・編集</h2>
        <div className="form-wrap">
          <ImageArea images={images} setImages={setImages} />
          <TextInput
            fullWidth={true}
            label={"スタッフ名"}
            multiline={false}
            required={true}
            onChange={inputName}
            rows={1}
            value={name}
            type={"text"}
          />
          <div className="spacer-medium" />
          <div className="center">
            <PrimaryButton
              label={"商品情報を保存"}
              onClick={() =>
                dispatch(saveStaff(id, attendIn, attendOut, name, images))
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaffEdit;
