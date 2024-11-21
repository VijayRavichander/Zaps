import {z} from "zod";


// SCHEMA for FORMS
export const resetSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });