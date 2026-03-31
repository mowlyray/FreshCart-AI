import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db";
import bcrypt from "bcryptjs";
import User from "./models/user.model";
import Google from "next-auth/providers/google";
import { image } from "framer-motion/client";
 
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
            id:user._id.toString(),
            name:user.name,
            email:user.email,
            role:user.role
          }
      },

    }),

    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks:{

    async signIn({user,account}) {
      if(account?.provider==="google"){
        await connectDb()
        let dbUser=await User.findOne({email:user.email})
        if(!dbUser) {
          dbUser=await User.create({
            name:user.name,
            email:user.email, 
            image:user.image, 
        })
      }

      user.id=dbUser._id.toString()
      user.role=dbUser.role
    }
      return true
    },

    jwt({token,user}) {
      if(user){
        token.id=user.id,
        token.name=user.name,
        token.email=user.email,
        token.role=user.role
      }
      return token
    },

    session({session,token}) {
      if(session.user){
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        session.user.id=token.id as string,
        session.user.name=token.name as string,
        session.user.email=token.email as string,
        session.user.role=token.role as string
      }
      return session
    },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60*1000
  },
  secret:process.env.AUTH_SECRET

})

//sign in step
//connect db
//email check
//password match
//return user data and token