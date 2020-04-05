import { getWorkout, updateWorkout } from "Services/workout.ts";
import { updateActiveWorkout, updateTask } from "./actions";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ActiveItemActions } from "./types";
import { Task } from "Store/types";
import { updateIdentifiableObjectInArray } from "Store/helper";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ActiveItemActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async dispatch => {
  const workout = await getWorkout(id);
  dispatch(updateActiveWorkout(workout));
};

export const updateTasksRequest = (tasks: Task[]): AppThunk => async (dispatch, getState) => {
  const workout = getState().activeItem.workout;
  const newWorkout = { ...workout, tasks };
  updateWorkout(newWorkout);
  dispatch(updateActiveWorkout(newWorkout));
};

export const updateTaskRequest = (task: Task): AppThunk => async (dispatch, getState) => {
  const workout = getState().activeItem.workout;
  const updatedWorkout = await updateWorkout({
    ...workout,
    tasks: updateIdentifiableObjectInArray(workout.tasks, task)
  });
  dispatch(updateActiveWorkout(updatedWorkout));
};
