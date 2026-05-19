'use client'
import { RootState } from '@/redux/store'
import { motion } from 'framer-motion'
import { ArrowLeft, Building, Home, MapPin, Navigation, Phone, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Root } from 'react-dom/client'
import { useSelector } from 'react-redux'

function Checkout() {

  const router=useRouter()
  const {userData} = useSelector((state:RootState) => state.user)
  const [address,setAddress] = useState({
    fullName:userData?.name,
    mobile:userData?.mobile,
    city:"",
    state:"",
    pinCode:"",
    fullAddress:""
  })

  return (
    <div className='w-[92%] md:w-[80%] py-10 mx-auto relative' >
        <motion.button
        whileTap={{scale:0.97}}
        className='absolute top-2 left-0 gap-2 text-green-700 font-semibold flex items-center cursor-pointer hover:text-green-800'
        onClick={()=>router.push("/user/cart")}
        >
            <ArrowLeft/>
            <span>Back to cart</span>
        </motion.button>

        <motion.h1
        initial={{ opacity: 0, y: 10}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'
        >
          Checkout
        </motion.h1>

        <div className='grid md:grid-cols-2 gap-8'>
          <motion.div
          initial={{ opacity: 0, x: -20}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100'
          >
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              <MapPin className='text-green-700'/>
              Delivery Address
            </h2>

            <div className='space-y-4'>
              <div className='relative'>
                <User className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.fullName} onChange={(e)=>setAddress({...address,fullName:e.target.value})}
                 className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className='relative'>
                <Phone className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.mobile} onChange={(e)=>setAddress({...address,mobile:e.target.value})}
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className='relative'>
                <Home className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.fullAddress} placeholder='Enter your full address' onChange={(e)=>setAddress({...address,fullAddress:e.target.value})}
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className='grid grid-cols-3 gap-3'>
                <div className='relative'>
                <Building className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.city}
                  placeholder='city' 
                  onChange={(e)=>setAddress({...address,city:e.target.value})}
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className='relative'>
                <Navigation className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.state}
                  placeholder='state' 
                  onChange={(e)=>setAddress({...address,state:e.target.value})}
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className='relative'>
                <Search className='absolute left-3 top-3 text-green-600' size={18}/>
                <input
                  type="text"
                  value={address.pinCode}
                  placeholder='pin code' 
                  onChange={(e)=>setAddress({...address,pinCode:e.target.value})}
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>
              </div>
            </div>

          </motion.div>
        </div>
      
    </div>
  )
}

export default Checkout
