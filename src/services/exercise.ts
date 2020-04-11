import { Exercise } from "Store/types";

export const getAllExercises: () => Promise<Exercise[]> = async () => {
  const response = await fetch("http://localhost:8080/exercise");
  return response.json();
};

export const getBodyParts: () => Promise<string[]> = async () => {
  const response = await fetch("http://localhost:8080/exercise/body-parts");
  return response.json();
};
