import db from "./db";


export const getVerificationTokenbyEmail = async (email : string) => {

    try {
        const verificationToken = await db.verificationToken.findFirst({where: {email}})
        return verificationToken;
    }catch {
        return null; 
    }
}


export const getVerificationUserbyToken = async (token : string) => {

    try {
        const verificationTokenUser = await db.verificationToken.findFirst({where: {token}})
        return verificationTokenUser;
    }catch {
        return null; 
    }
}