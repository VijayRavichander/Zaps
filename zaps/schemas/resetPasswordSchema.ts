import {z} from "zod";

export const resetPasswordSchema = z.object({
    token: z.string(),
    password1: z.string().min(6,{
      message: "Password must be at least 6 characters",
    }),
    password2: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  });