'use client'
import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bike, ShoppingBasket, ShoppingCart } from 'lucide-react'

type propType={
    nextStep:(s:number)=>void
}

function Welcome({nextStep}:propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-100 to-white'>
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className='flex items-center gap-3'>

            <ShoppingBasket className='w-10  h-20 text-green-600'/>
            <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>Welcome to Freshcart AI</h1>
            </motion.div>

            <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className='mt-4 text-gray-700 text-lg md:text-xl max-w-lg'>
                {/* <ShoppingCart className='w-10 h-10 text-green-600' /> */}
                Order fresh groceries with ease, track your delivery in real-time, and enjoy a smooth shopping experience with smart features built for convenience.

            </motion.p>

            <motion.div initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }} className='flex items-center justify-center gap-10 mt-8 '>
                <ShoppingBasket className='w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md'/>

                <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-md'/>
            </motion.div>

            <motion.button  initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }} className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-14 rounded-2xl shadow-md transition-all duration-200 mt-10' onClick={()=>nextStep(2)}>
                Next
                <ArrowRight/>
            </motion.button>
      
    </div>
  )
}

export default Welcome
