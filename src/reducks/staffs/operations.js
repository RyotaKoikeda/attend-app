import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { fetchStaffsAction, deleteStaffsAction } from "./actions";

const staffsRef = db.collection("staffs");

export const deleteStaff = (id) => {
  return async (dispatch, getState) => {
    staffsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevStaffs = getState().staffs.list;
        const nextStaffs = prevStaffs.filter((staff) => staff.id !== id);
        dispatch(deleteStaffsAction(nextStaffs));
        alert("スタッフを削除しました");
        window.location.reload();
      });
  };
};

export const fetchStaffs = () => {
  return async (dispatch) => {
    staffsRef
      .orderBy("created_at", "desc")
      .get()
      .then((snapshots) => {
        const staffList = [];
        snapshots.forEach((snapshot) => {
          const staff = snapshot.data();
          staffList.push(staff);
        });
        dispatch(fetchStaffsAction(staffList));
      });
  };
};

export const saveStaff = (id, attend, name, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      images: images,
      name: name,
      attend: attend,
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = staffsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return staffsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        alert("スタッフを追加しました");
        dispatch(push("/attend/"));
        window.location.reload();
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const saveAttend = (id, staffs, attend) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = [];

    attend.length = id;

    attend.map((value, id) => {
      data.push({
        attend: [],
        updated_at: timestamp,
      });
      data[id].attend = value;

      return staffsRef
        .doc(staffs[id].id)
        .set(data[id], { merge: true })
        .then(() => {
          staffsRef
            .orderBy("created_at", "desc")
            .get()
            .then((snapshots) => {
              const staffList = [];
              snapshots.forEach((snapshot) => {
                const staff = snapshot.data();
                staffList.push(staff);
              });
              dispatch(fetchStaffsAction(staffList));
            });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });

    dispatch(push("/attend/"));
  };
};
