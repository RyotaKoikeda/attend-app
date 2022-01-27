import * as Actions from "./actions";
import initialState from "../store/initialState";

export const StaffsReducer = (state = initialState.staffs, action) => {
  switch (action.type) {
    case Actions.DELETE_STAFFS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_STAFFS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
