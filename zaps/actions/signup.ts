"use server"
import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod";

export const login = async (values : z.infer<typeof signupSchema> ) =>{
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields) { return { error: "Invalid Fields!"}}

  return {success: "Email Sent"}

}