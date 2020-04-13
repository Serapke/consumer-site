import { Exercise } from "Store/types";

export const getAllExercises: () => Promise<Exercise[]> = async () => {
  const response = await fetch("http://localhost:8080/exercise");
  return response.json();
};

export const getBodyParts: () => Promise<string[]> = async () => {
  const response = await fetch("http://localhost:8080/exercise/body-parts");
  return response.json();
};

export const createExercise: (exercise: Exercise) => Promise<string> = async (exercise) => {
  const response = await fetch("http://localhost:8080/exercise/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  return response.json();
};
