import db from "@/lib/db";


export const getResetTokenbyToken = async (token: string) => {

    try{
        const resetToken = db.passwordResetToken.findUnique({
            where: {
                token
            }
        })

        return resetToken
    }catch{
        return null;
    }

}

export const getResetTokenbyEmail = async (email: string) => {

    try{
        const resetToken = db.passwordResetToken.findFirst({
            where: {
                email
            }
        })

        return resetToken
    }catch{
        return null;
    }

}