import { Reducer } from "redux";
import { ContentState, ContentActions, ContentActionType } from "./types";

export const initialState: ContentState = {
  routines: [],
  workouts: []
};

const reducer: Reducer<ContentState> = (state: ContentState = initialState, action: ContentActions) => {
  switch (action.type) {
    case ContentActionType.ROUTINES_LIST_UPDATED:
      return { ...state, routines: action.routines };
    case ContentActionType.WORKOUTS_LIST_UPDATED:
      return { ...state, workouts: action.workouts };
    default:
      return state;
  }
};

export default reducer;
