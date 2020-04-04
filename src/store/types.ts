export interface Routine {
  id: number;
  title: string;
  workouts: Workout[];
}

export interface Workout {
  id: number;
  title: string;
  restPeriodInSeconds: number;
  tasks: Task[];
}

export interface Task {
  id: number;
  exercise: Exercise;
  sets: number[];
  order: number;
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  bodyParts: ("SHOULDERS" | "ARMS" | "CHEST" | "ABS" | "BACK" | "BUTT" | "LEGS")[];
  defaultReps: number;
  type: "TIMED" | "QUANTITATIVE" | "STRETCH";
}
