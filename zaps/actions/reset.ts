"use server"

import { getUserbyEmail } from "@/lib/user";
import { resetSchema } from "@/schemas/resetSchema"
import { z } from "zod"

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

    return {success : "Reset Email Sent!"}

}