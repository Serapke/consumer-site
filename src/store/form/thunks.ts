import { ThunkAction } from "redux-thunk";
import { Field, FormStateActions, WorkoutFormState } from "./types";
import { ApplicationState } from "..";
import { updateWorkoutForm, setupWorkoutForm } from "./action";
import { Task, Workout } from "Store/types";
import { updateIdentifiableObjectInArray } from "Utils/immutable";
import { getWorkout } from "Services/workout";
import { emptyWorkoutFormState } from "./utils";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, FormStateActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async (dispatch) => {
  const workout = await getWorkout(id);
  const form = workoutToForm(workout);
  dispatch(setupWorkoutForm(form));
};

export const clearWorkoutFormRequest = (): AppThunk => (dispatch) => {
  dispatch(setupWorkoutForm(emptyWorkoutFormState));
};

export const updateWorkoutFormRequest = (field: Field): AppThunk => (dispatch) => {
  dispatch(updateWorkoutForm(field));
};

export const addExercisesToWorkoutRequest = (exerciseIDs: string[]): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const tasks = exerciseIDs.map((exerciseID, index) => mapExerciseIDToTask(exerciseID, index, state));
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: [...state.form.workout.tasks.value, ...tasks] } }));
};

export const updateTasksRequest = (tasks: Task[]): AppThunk => (dispatch) => {
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: tasks } }));
};

export const updateTaskRequest = (task: Task): AppThunk => async (dispatch, getState) => {
  const workout = getState().activeItem.workout;
  const tasks = updateIdentifiableObjectInArray(workout.tasks, task);
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: tasks } }));
};

const workoutToForm = (workout: Workout): WorkoutFormState => ({
  title: { value: workout.title },
  restPeriodInSeconds: { value: workout.restPeriodInSeconds },
  tasks: { value: workout.tasks },
});

const mapExerciseIDToTask = (exerciseID: string, index: number, state: ApplicationState): Task => {
  const exercise = state.content.exercises.find((exercise) => exercise.id === exerciseID);
  return { id: index, exercise: exercise, sets: [exercise.defaultReps] };
};
