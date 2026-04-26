'use client'
import { Leaf, Smartphone, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function HeroSection() {
    const slides = [
        {
            id:1,
            icon:<Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg" />,
            title:"Fresh Organic Groceries",
            subtitle:"Farm-fresh fruits,vegetables, and daily essentials delivered to your doorstep.",
            btnText:"Shop Now",
            bg:"https://images.unsplash.com/photo-1775385922660-fc52c2d23c8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fEZyZXNoJTIwT3JnYW5pYyUyMEdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id:2,
            icon:<Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />,
            title:"Fast and Reliable Delivery",
            subtitle:"We ensure your groceries arrive on time, every time, with our efficient delivery service.",
            btnText:"Order Now",
            bg:"https://images.unsplash.com/photo-1607130232670-52123ba5be5c?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:3,
            icon:<Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />,
            title:"Shop Anytime, Anywhere",
            subtitle:"Easy and seamless online grocery shopping experience",
            btnText:"Get Started",
            bg:"https://media.istockphoto.com/id/2227191121/photo/delivery-man-in-uniform-deliver-dessert-to-happy-office-worker.jpg?s=1024x1024&w=is&k=20&c=bDQqKSLA8UK_k13A644g3FP5xjjtY35STgJkokdp1bg="
        }
    ]

    const [current,setCurrent] = useState(0)

    useEffect(() =>{
        const timer=setInterval(() =>{
            setCurrent(prev=>prev+1%slides.length)
        },4000)
        return () => clearInterval(timer)
    },[])


  return (
    <div>
      
    </div>
  )
}

export default HeroSection
