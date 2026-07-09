import { nanoid } from "nanoid";

export const generateShortId = (): string => {
  return nanoid(7);
};
