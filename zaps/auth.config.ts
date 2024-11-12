import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/loginSchema";
import { getUserbyEmail } from "./lib/user";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";
import Github from "next-auth/providers/github";


export default { 
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }), 
        Credentials({
            name: "Credentials",
            authorize: async (credentials) => {                
                const validatedFields = loginSchema.safeParse(credentials)

                if(validatedFields.success){
                    const {email, password} = validatedFields.data;

                    const user: User | null = await getUserbyEmail(email);

                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcryptjs.compare(password, user.password)

                    if(passwordsMatch) return user;
                }

                return null;
            }
        })
    ] 
} satisfies NextAuthConfig;
