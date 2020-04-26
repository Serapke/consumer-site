import { WorkoutFormState } from "./types";
import { Workout, Task } from "Store/types";

export const emptyWorkoutFormState: WorkoutFormState = {
  title: { value: "", error: null },
  restPeriodInSeconds: { value: "", error: null },
  tasks: { value: [], error: null },
};

export const formToWorkout = (state: WorkoutFormState): Workout => ({
  id: null,
  title: state.title.value,
  restPeriodInSeconds: state.restPeriodInSeconds.value,
  tasks: state.tasks.value.map((task: Task) => ({ ...task, id: null } as Task)),
});
