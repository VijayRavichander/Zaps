"use server"
import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";

export const login = async (values : z.infer<typeof loginSchema> ) =>{
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields) { return { error: "Invalid Fields!"}}

  return {success: "Email Sent"}

}