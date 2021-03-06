import { Exercise, BodyPart } from "Store/types";
import { ApiResponse } from "./types";

export const getAllExercises: () => Promise<Exercise[]> = async () => {
  const response = await fetch(`${process.env.API_URL}/exercise`);
  return response.json();
};

export const getBodyParts: () => Promise<BodyPart[]> = async () => {
  const response = await fetch(`${process.env.API_URL}/exercise/body-parts`);
  return response.json();
};

export const createExercise: (
  exercise: Exercise
) => Promise<ApiResponse> = async (exercise) => {
  const response = await fetch(`${process.env.API_URL}/exercise/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  return response.json();
};
