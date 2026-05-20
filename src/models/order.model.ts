import mongoose from "mongoose";

interface IOrder{
    _id?:mongoose.Types.ObjectId
    user:mongoose.Types.ObjectId
    items:[
        {
            grocery:mongoose.Types.ObjectId
            name:string,
            price:string,
            unit:string,
            image:string,
            quantity:number
        }
    ]
    totalAmount:string,
    paymentMethod:"cod" | "online"
    address:{
        fullName:string,
        mobile:string,
        city:string,
        state:string,
        pincode:string,
        fullAddress:string
        latitude:number,
        longitude:number
    }
}