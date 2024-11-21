"use server"

import db from "@/lib/db";
import { sendResetEmail } from "@/lib/mail";
import { getResetTokenbyToken } from "@/lib/password-reset";
import { generateResetToken } from "@/lib/tokens";
import { getUserbyEmail } from "@/lib/user";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { resetSchema } from "@/schemas/resetSchema"
import { z } from "zod"
import bcryptjs from "bcryptjs";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid Email!"}
    }

    const {email}  = validatedFields.data;

    const exisitingUser = await getUserbyEmail(email);

    if(!exisitingUser){
        return {error: "Invalid Email!"}
    }

    // TODO: Generate Token and send reset email

    const token = await generateResetToken(email);

    await sendResetEmail(token.email, token.token);

    return {success : "Reset Email Sent!"}

}


export const resetPasswordForm = async (values: z.infer<typeof resetPasswordSchema>) => {
    const validatedFields = resetPasswordSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Inputs are invalid"}
    }

    const {token, password1} = validatedFields.data

    const verifiedToken = await getResetTokenbyToken(token)

    if(!verifiedToken){
        return {error: "Invalid Token"}
    }

    const expired = new Date(verifiedToken.expires) < new Date();

    if(expired){
        return {error: "Token Expired. Try Again!"}
    }

    const exisitngUser = await getUserbyEmail(verifiedToken.email)
    
    if(!exisitngUser){
        return {error: "Email doesn't exist"}
    }

    const hashedPassword = await bcryptjs.hash(password1, 10);
    await db.user.update({
        where: {
            email: verifiedToken.email
        }, 
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: verifiedToken.id
        }
    })

    return {success: "Reset Password!"}

}