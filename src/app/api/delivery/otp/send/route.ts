import connectDb from "@/lib/db"
import { sendMail } from "@/lib/mailer"
import Order from "@/models/order.model"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest){
    try {
        await connectDb()
        const {orderId}=await req.json()
        const order=await Order.findById(orderId)
        if(!order){
            return NextResponse.json(
                {message:"order not found"},
                {status:400}
            )
        }

        const otp=Math.floor(10000+Math.random()*9000).toString()
        order.deliveryOtp=otp
        await order.save()

        await sendMail(
            order.user.email,
            "Your Delivery OTP",
            `<h2>Your Delivery OTP is <strong>${otp}</strong>`
        )
        return NextResponse.json(
                {message:"otp sent successfully"},
                {status:200}
            )


    } catch(error){
        return NextResponse.json(
                {message:`send otp error ${error}`},
                {status:500}
            )

    }
}