import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/libs/prisma"
import bycrpt  from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const userFound= await prisma.users.findUnique({
            where:{
                email:credentials.email,
            }
        })
        if(!userFound) throw new Error('No user found');

        

        const matchPassword=await bycrpt.compare(credentials.password,userFound.password)
        if (!matchPassword) throw new Error('contrasania incorrecta')
        return {
            id:userFound.id,
            name: userFound.username,
            email: userFound.email,

        }
      },
    }),
  ],
  pages:{
    signIn:  "/auth/login",
  }
};
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST};