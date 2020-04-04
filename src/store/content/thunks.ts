import { ThunkAction } from "redux-thunk";
import { getAllRoutines } from "Services/routine.ts";
import { updateRoutineList, updateWorkoutList } from "Store/content/actions";
import { ApplicationState } from "Store/index";
import { ContentActions } from "./types";
import { getAllWorkouts } from "Services/workout.ts";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ContentActions>;

export const fetchRoutinesRequest = (): AppThunk => async dispatch => {
  const routines = await getAllRoutines();
  dispatch(updateRoutineList(routines));
};

export const fetchWorkoutsRequest = (): AppThunk => async dispatch => {
  const workouts = await getAllWorkouts();
  dispatch(updateWorkoutList(workouts));
};
