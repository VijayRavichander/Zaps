import {z} from "zod";

export const signupSchema = z.object({
    username: z.string(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });