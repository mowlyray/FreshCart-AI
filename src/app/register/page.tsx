'use client'
import RegisterForm from '@/Components/RegisterForm'
import Welcome from '@/Components/Welcome'
import React, { useState } from 'react'

function Register() {
    const [step,setStep]=useState(1)
  return (
    <div>
      {
        step==1 ?<Welcome/>:<RegisterForm/>
      }

      
    </div>
  )
}

export default Register
