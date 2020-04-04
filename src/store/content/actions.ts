import { ActionCreator } from "redux";
import { ContentActionType, RoutinesListUpdatedAction, WorkoutsListUpdatedAction } from "./types";
import { Routine, Workout } from "Store/types";

export const updateRoutineList: ActionCreator<RoutinesListUpdatedAction> = (routines: Routine[]) => ({
  type: ContentActionType.ROUTINES_LIST_UPDATED,
  routines
});

export const updateWorkoutList: ActionCreator<WorkoutsListUpdatedAction> = (workouts: Workout[]) => ({
  type: ContentActionType.WORKOUTS_LIST_UPDATED,
  workouts
});
