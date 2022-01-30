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
      });
  };
};

export const fetchStaffs = () => {
  return async (dispatch) => {
    staffsRef
      .orderBy("updated_at", "desc")
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

export const saveStaff = (id, name, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      images: images,
      name: name,
      attend: [],
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
        dispatch(push("/attend/edit"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
