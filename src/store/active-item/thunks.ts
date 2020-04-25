import { updateActiveWorkout } from "./actions";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ActiveItemActions } from "./types";
import { Task, Workout } from "Store/types";
import { updateIdentifiableObjectInArray } from "Utils/immutable";
import { getWorkout, updateWorkout } from "Services/workout";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ActiveItemActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async (dispatch) => {
  const workout = await getWorkout(id);
  dispatch(updateActiveWorkout(workout));
};

export const updateWorkoutRequest = (workout: Workout): AppThunk => async (dispatch) => {
  const updatedWorkout = await updateWorkout(workout);
  dispatch(updateActiveWorkout(updatedWorkout));
};

export const updateTasksRequest = (tasks: Task[], options: any): AppThunk => (dispatch, getState) => {
  const workout = getState().activeItem.workout;
  const newWorkout = { ...workout, tasks };

  if (options.updateOnServer) {
    updateWorkout(newWorkout);
  }

  dispatch(updateActiveWorkout(newWorkout));
};

export const updateTaskRequest = (task: Task, options: any): AppThunk => async (dispatch, getState) => {
  const workout = getState().activeItem.workout;
  let updatedWorkout = {
    ...workout,
    tasks: updateIdentifiableObjectInArray(workout.tasks, task),
  };

  if (options.updateOnServer) {
    updatedWorkout = await updateWorkout(updatedWorkout);
  }

  dispatch(updateActiveWorkout(updatedWorkout));
};

export const saveWorkoutProgressRequest = (workout: Workout): AppThunk => async (dispatch) => {
  dispatch(updateActiveWorkout(workout));
};

const mapExerciseIDToTask = (exerciseID: string, index: number, state: ApplicationState): Task => {
  const exercise = state.content.exercises.find((exercise) => exercise.id === exerciseID);
  return { id: index, exercise: exercise, sets: [exercise.defaultReps] };
};

export const saveWorkoutTasksRequest = (exerciseIDs: string[]): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const workout = state.activeItem.workout;
  dispatch(
    updateActiveWorkout({
      ...workout,
      tasks: exerciseIDs.map((exerciseID, index) => mapExerciseIDToTask(exerciseID, index, state)),
    })
  );
};
