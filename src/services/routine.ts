import { Routine } from "Store/types";

export const getAllRoutines: () => Promise<Routine[]> = async () => {
  const response = await fetch(`${process.env.API_URL}/routine`);
  return response.json();
};
