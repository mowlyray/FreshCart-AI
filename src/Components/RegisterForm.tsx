import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'

type propType={
    previousStep:(s:number)=>void
}

function RegisterForm({previousStep}:propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
      <div className='absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 ransition-colors cursor-pointer'
      onClick={()=>previousStep(1)}>
        <ArrowLeft className='w-5 h-5'/>
        <span className='font-medium'>Back</span> 
      </div>
      <motion.h1>Create Account</motion.h1>
      
    </div>
  )
}

export default RegisterForm
