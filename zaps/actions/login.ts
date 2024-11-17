"use server"
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserbyEmail } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values : z.infer<typeof loginSchema> ) =>{
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) { return { error: "Invalid Fields!"}}

  const {email, password} = validatedFields.data

  const exisitingUser = await getUserbyEmail(email)

  if(!exisitingUser || !exisitingUser.email){
    return {error: "User doesn't exists. Please create an account"}
  }

  if(!exisitingUser.emailVerified){
    // TODO: Rate Limit
    const verificationToken = await generateVerificationToken(exisitingUser.email);

    await sendVerificationEmail(
      verificationToken.email, 
      verificationToken.token
    )

    return {success: "Confirmation Email Sent!"}
  }


  try{
    await signIn("credentials", {
      email, 
      password, 
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  }catch(error){
    // TODO
    if(error instanceof AuthError){
      switch (error.type){
        case "CredentialsSignin":
          return {error: "Invalid Credentials"}
        
        default: 
          return {error: "Something went wrong"}
      }

    }

    throw error;
  }
}