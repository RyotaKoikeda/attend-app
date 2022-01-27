export const DELETE_STAFFS = "DELETE_STAFFS";
export const deleteStaffsAction = (staffs) => {
  return {
    type: "DELETE_PRODUCTS",
    payload: staffs,
  };
};

export const FETCH_STAFFS = "FETCH_STAFFS";
export const fetchStaffsAction = (staffs) => {
  return {
    type: "FETCH_STAFFS",
    payload: staffs,
  };
};
