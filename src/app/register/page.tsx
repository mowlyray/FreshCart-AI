'use client'
import Welcome from '@/Components/Welcome'
import React, { useState } from 'react'

function Register() {
    const [step,setStep]=useState(1)
  return (
    <div>
      <Welcome/>
    </div>
  )
}

export default Register
