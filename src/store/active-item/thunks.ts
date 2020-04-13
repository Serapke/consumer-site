import { updateActiveWorkout } from "./actions";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ActiveItemActions } from "./types";
import { Task, Workout, Exercise } from "Store/types";
import { updateIdentifiableObjectInArray } from "Utils/immutable";
import { getWorkout, updateWorkout } from "Services/workout";
import { createExercise } from "Services/exercise";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ActiveItemActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async (dispatch) => {
  const workout = await getWorkout(id);
  dispatch(updateActiveWorkout(workout));
};

export const updateWorkoutRequest = (workout: Workout): AppThunk => async (dispatch) => {
  const updatedWorkout = await updateWorkout(workout);
  dispatch(updateActiveWorkout(updatedWorkout));
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
    tasks: updateIdentifiableObjectInArray(workout.tasks, task),
  });
  dispatch(updateActiveWorkout(updatedWorkout));
};
