import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { async } from './../.next/dev/types/routes.d';
import connectDb from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./models/user.model";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      //connect db
      async authorize(credintials, request) {
      
          await connectDb()
          const email=credintials.email
          const password=credintials.password as string
          const user=await User.findOne({email})
          if(!user){
            throw new Error("user does not exist")
          }
          const isMatch=await bcrypt.compare(password,user.password)
          if(!isMatch){
            throw new Error("incorrect password")
          }
          return {
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
          }
      },

    })
  ],
  callbacks:{
    jwt({token,user}) {
      if(user){
        token.id=user.id,
        token.name=user.name,
        token.email=user.email,
        token.role=user.role
      }
    },
  }
})

//sign in step
//connect db
//email check
//password match
//return user data and token