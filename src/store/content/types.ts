import { Action } from "redux";
import { Routine, Workout } from "Store/types";

export interface ContentState {
  routines: Routine[];
  workouts: Workout[];
}

export enum ContentActionType {
  ROUTINES_LIST_UPDATED = "@@content/ROUTINES_LIST_UPDATED",
  WORKOUTS_LIST_UPDATED = "@@content/WORKOUTS_LIST_UPDATED"
}

export interface RoutinesListUpdatedAction extends Action {
  type: ContentActionType.ROUTINES_LIST_UPDATED;
  routines: Routine[];
}

export interface WorkoutsListUpdatedAction extends Action {
  type: ContentActionType.WORKOUTS_LIST_UPDATED;
  workouts: Workout[];
}

export type ContentActions = RoutinesListUpdatedAction | WorkoutsListUpdatedAction;
