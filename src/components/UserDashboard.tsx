import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectDb from '@/lib/db'
import Grocery from '@/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'

async function UserDashboard() {
  await connectDb()
  const groceries=await Grocery.find({}).lean()
  return (
    <>
      <HeroSection />
      <CategorySlider/>
      {groceries.map((item)=>(
        <GroceryItemCard item={item} />
      ))}
    </>
  )
}

export default UserDashboard
