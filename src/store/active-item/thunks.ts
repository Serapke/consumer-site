import { getWorkout } from "Services/workout.ts";
import { updateActiveWorkout, updateTask } from "./actions";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ActiveItemActions } from "./types";
import { Task } from "Store/types";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ActiveItemActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async dispatch => {
  const workout = await getWorkout(id);
  dispatch(updateActiveWorkout(workout));
};

export const updateTaskRequest = (task: Task): AppThunk => async dispatch => {
  dispatch(updateTask(task));
};
