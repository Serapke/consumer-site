import { Routine } from "Store/types";

export const getAllRoutines: () => Promise<Routine[]> = async () => {
  const response = await fetch("http://localhost:8080/routine");
  return response.json();
};
