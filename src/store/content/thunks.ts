import { ThunkAction } from "redux-thunk";
import { updateRoutineList, updateWorkoutList, updateBodyPartList, updateExerciseList } from "Store/content/actions";
import { ApplicationState } from "Store/index";
import { ContentActions } from "./types";
import { getBodyParts, getAllExercises } from "Services/exercise";
import { getAllRoutines } from "Services/routine";
import { getAllWorkouts } from "Services/workout";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ContentActions>;

export const fetchRoutinesRequest = (): AppThunk => async (dispatch) => {
  const routines = await getAllRoutines();
  dispatch(updateRoutineList(routines));
};

export const fetchWorkoutsRequest = (): AppThunk => async (dispatch) => {
  const workouts = await getAllWorkouts();
  dispatch(updateWorkoutList(workouts));
};

export const fetchExercisesRequest = (): AppThunk => async (dispatch) => {
  const exercises = await getAllExercises();
  dispatch(updateExerciseList(exercises));
};

export const fetchBodyPartsRequest = (): AppThunk => async (dispatch) => {
  const bodyParts = await getBodyParts();
  dispatch(updateBodyPartList(bodyParts));
};
