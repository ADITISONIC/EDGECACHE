import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "development_secret";

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign({ userId }, JWT_SECRET, options);
};
