import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";

const staffsRef = db.collection("staffs");

export const saveStaff = (id, name, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      images: images,
      name: name,
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
