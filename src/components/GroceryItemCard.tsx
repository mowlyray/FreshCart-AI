'use client'
import mongoose from 'mongoose';
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function GroceryItemCard({item}:{item: IGrocery}) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50, scale:0.9}}
    whileInView={{ opacity: 1, y: 0, scale:1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}
    className=' bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300'
    >
      <div className='relative w-full aspect-4/3 bg-gray-50 overflow-hidden group'>
        <Image src={item.image} fill alt={item.name} sizes='(max-width:768px) 100vw, 25vw' className='object-contain p-4 transition-transform duration-500 group-hover:scale-105' />
        <div className='absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'/>
      </div>

      <div className='p-4 flex-1 flex flex-col '>
        <p className='text-xs font-medium mb-1 text-gray-600'>{item.category}</p>
        <h3 className='text-lg font-bold text-gray-500'>{item.name}</h3>
        <div className='flex items-center justify-between mt-2'>
            <span className='text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1'>{item.unit}</span>
            <span className='text-lg font-bold text-green-700'>${item.price}</span>
        </div>

        <motion.button className='mt-4 w-full  bg-green-600 text-white font-medium py-2 rounded-full text-sm hover:bg-green-700 transition-all  flex items-center justify-center gap-2 cursor-pointer'
        whileTap={{ scale: 0.96 }}
        >
            <ShoppingCart className='w-4 h-4'/>Add to Cart
        </motion.button>

      </div>
    </motion.div>
  )
}

export default GroceryItemCard
