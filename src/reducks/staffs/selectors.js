import { createSelector } from "reselect";

const staffsSelector = (state) => state.staffs;

export const getStaffs = createSelector([staffsSelector], (state) => state.list);
