import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "./lib/db"
import { getUserbyId } from "./lib/user"
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login", 
        error: "/auth/error"
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {id: Number(user.id)}, 
                data: {
                    emailVerified: new Date()
                }
            })
        }
    }, 
    callbacks: {
        async signIn({account, user}){
            if(account?.provider != "credentials") return true;
            
            if(!user.id){
                return false
            }

            const exisitingUser = await getUserbyId(user.id);
            
            if(!exisitingUser?.emailVerified){
                return false;
            }

            return true;
        },
        async session({token, session}){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            return session
        },
        async jwt({token}){
            return token
        }
    }, 
    adapter: PrismaAdapter(db), 
    session: {strategy: "jwt"},
    ...authConfig, 
})