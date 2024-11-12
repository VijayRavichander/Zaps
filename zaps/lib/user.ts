import db from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
    try {
        const user = db.user.findUnique({where: {email}})

        return user
    } catch{
        return null;
    }
}

export const getUserbyId = async (id: string) => {
    try {
        const num_id = Number(id);
        const user = db.user.findUnique({where: {id: num_id} })

        return user
    } catch{
        return null;
    }
}