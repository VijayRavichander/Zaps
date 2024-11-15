import db from "./db";


export const getVerificationTokenbyEmail = async (email : string) => {

    try {
        const verificationToken = await db.verificationToken.findFirst({where: {email}})
        return verificationToken;
    }catch {
        return null; 
    }
}


// export const getVerificationTokenby = (email : string) => {

//     try {
//         const verificationToken = db.verificationToken.findFirst({where: {email}})
//         return verificationToken;
//     }catch {
//         return null; 
//     }
// }