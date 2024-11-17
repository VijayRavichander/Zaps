import { join } from "path";
import { v4 } from "uuid"
import db from "./db";
import { getVerificationTokenbyEmail } from "./verification-email";

export const generateVerificationToken = async (email: string) => {

    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exisitingToken = await getVerificationTokenbyEmail(email);

    if (exisitingToken){
        await db.verificationToken.delete({
            where : {
                id: exisitingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email, 
            expires, 
            token
        }
    })

    return verificationToken;

}
