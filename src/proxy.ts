import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest) {

    const {pathname} = req.nextUrl
    const publicRoutes = ["/login","/register","api/auth"]

    if(publicRoutes.some((path) => pathname.startsWith(path))){
        return NextResponse.next()
    }

    const token = await getToken({req,secret:process.env.AUTH_SECRET})
    console.log("Token in middleware",token)
    console.log("Request URL in middleware",req.url)

    if(!token){
        const loginUrl = new URL("/login",req.url)
        loginUrl.searchParams.set("callbackUrl",req.url)
        return NextResponse.redirect(loginUrl)
    }

    const role = token.role
    



    return NextResponse.next()
}

export const config = {
    matcher:
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    
}



//req......middleware.....server