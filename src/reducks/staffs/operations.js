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

export const saveStaff = (id, attendIn, attendOut, name, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      images: images,
      name: name,
      attendIn: attendIn,
      attendOut: attendOut,
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
        dispatch(push("/"));
        window.location.reload();
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const saveAttend = (id, staffs, attendIn, attendOut) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = [];

    attendIn.length = id;
    attendOut.length = id;

    attendIn.map((value, id) => {
      data.push({
        attendIn: [],
        attendOut: [],
        updated_at: timestamp,
      });
      data[id].attendIn = value;
      data[id].attendOut = attendOut[id];

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
            })
            .then(() => {
              dispatch(push("/"));
              window.location.reload();
            });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  };
};
