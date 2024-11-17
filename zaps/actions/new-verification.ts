"use server"

import db from "@/lib/db";
import { getUserbyEmail } from "@/lib/user";
import { getVerificationUserbyToken } from "@/lib/verification-email"

export const userVerification = async ( token : string) => {

    const exisitingToken = await getVerificationUserbyToken(token);

    if(!exisitingToken) return {error: "Something wrong with token. Try Again"};

    const expired = new Date(exisitingToken.expires) < new Date();

    if(expired){
        return {error: "Token Expired. Try Again!"}
    }

    const exisitingUser = await getUserbyEmail(exisitingToken.email);

    if(!exisitingUser){
        return {error: "Email does not exist!"}
    }
    await db.user.update({
        where: {id: exisitingUser.id}, 
        data: {
            emailVerified: new Date(),
            email: exisitingToken.email, 
        }
    })

    await db.verificationToken.delete({
        where: { id: exisitingToken.id}
    })

    return {success: "Verified! Please Login"}

}