import { Workout } from "Store/types";

export const getAllWorkouts: () => Promise<Workout[]> = async () => {
  const response = await fetch("http://localhost:8080/workout");
  return response.json();
};

export const getWorkout: (id: string) => Promise<Workout> = async id => {
  const response = await fetch(`http://localhost:8080/workout/${id}`);
  return response.json();
};
