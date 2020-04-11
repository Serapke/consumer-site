import { Workout } from "Store/types";

export const getAllWorkouts: () => Promise<Workout[]> = async () => {
  const response = await fetch("http://localhost:8080/workout");
  return response.json();
};

export const getWorkout: (id: string) => Promise<Workout> = async id => {
  const response = await fetch(`http://localhost:8080/workout/${id}`);
  return response.json();
};

export const updateWorkout: (workout: Workout) => Promise<Workout> = async workout => {
  const response = await fetch("http://localhost:8080/workout/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workout)
  });
  return response.json();
};
