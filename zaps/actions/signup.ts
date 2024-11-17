"use server";
import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import { getUserbyEmail } from "@/lib/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {generateVerificationToken} from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail";
export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);


  const exisitingUser = await getUserbyEmail(email);

  if(exisitingUser){
    return {error: "Email Already in use!"};
  }

  await db.user.create({
    data: {
      name: username, 
      email, 
      password: hashedPassword,
    }
  })

  const verificationToken = await generateVerificationToken(email);

  // await signIn("credentials", {
  //   email, 
  //   password, 
  //   redirectTo: DEFAULT_LOGIN_REDIRECT
  // })

  // TODO: Send Verification Token Email
  await sendVerificationEmail(
    verificationToken.email, 
    verificationToken.token
  )

  return { success: "Confirmation Email Sent!" };
};
