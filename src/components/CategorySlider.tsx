'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, Cookie, Milk, Wheat, Flame, Coffee, Heart, Home, Box, Baby, ChevronLeft, ChevronRight } from 'lucide-react'

function CategorySlider() {
    const categories=[
        { id: 1, name: "Fruits & Vegetables",icon:Apple, color:"bg-green-100" },
        { id: 2, name: "Dairy & Eggs", icon:Milk, color:"bg-yellow-100" },
        { id: 3, name: "Rice, Atta & Grains", icon: Wheat, color:"bg-orange-100" },
        { id: 4, name: "Snacks & Biscuits", icon: Cookie, color:"bg-pink-100" },
        { id: 5, name: "Spices & Masalas", icon: Flame, color:"bg-red-100" },
        { id: 6, name: "Beverages & Drinks", icon:Coffee, color:"bg-blue-100" },
        { id: 7, name: "Personal Care", icon: Heart, color:"bg-purple-100" },
        { id: 8, name: "Household Essentials", icon: Home, color:"bg-lime-100" },
        { id: 9, name: "Instant & Packaged Food", icon:Box, color:"bg-teal-100" },
        { id: 10, name: "Baby & Pet Care", icon: Baby, color:"bg-rose-100" },
    ]

    const [showLeft,setShowLeft]=useState<Boolean>()
    const [showRight,setShowRight]=useState<Boolean>()

    const scrollRef = useRef<HTMLDivElement>(null)
    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return
        const scrollAmount = direction =='left' ? -300 : 300
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    const checkScroll=()=>{
        if (!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setShowLeft(scrollLeft > 0)
        setShowRight(scrollLeft + clientWidth <=scrollWidth-5)

    }

    useEffect(()=>{
      const autoScroll=setInterval(()=>{
        if (!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        if(scrollLeft + clientWidth >= scrollWidth-5){
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }else{
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
      },1500)
      return ()=>{
        clearInterval(autoScroll)
      }
    },[])

    useEffect(()=>{
      scrollRef.current?.addEventListener('scroll', checkScroll)
      checkScroll() 
      return ()=>{
        removeEventListener('scroll', checkScroll)
      }
    },[])


  return (
    <motion.div
      className='w-[90%] md:w-[80%] mx-auto mt-10 relative'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className='text-2xl md:text-3xl font-bold text-green-700 text-center mb-6'>🛒 Shop by Category</h2>

      {showLeft && <button className='absolute left-0 z-10 w-10 h-10 flex items-center justify-center top-1/2  -translate-y-1/2 bg-white shadow-lg rounded-full hover:bg-green-100 transition-all cursor-pointer' onClick={() => scroll('left')}>
        <ChevronLeft className='w-6 h-6 text-green-700'/>
      </button>}


      <div className='flex gap-6 overflow-x-auto pb-4 px-10 scrollbar-hide scroll-smooth' ref={scrollRef}>
        {categories.map((cat) => {
            const Icon = cat.icon
            return <motion.div
            key={cat.id}
                className={`min-w-[150px]  md:min-w-[180px] flex flex-col items-center justify-center rounded-2xl ${cat.color} hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className='flex flex-col items-center justify-center p-5'>
                <Icon className='w-10 h-10 text-green-700 mb-3'/>
                <p className='text-center text-sm md:text-base font-semibold text-gray-700'>{cat.name}</p>

              </div>
                
            </motion.div>
            
        })}
      </div>

      {showRight && <button className='absolute right-0 z-10 w-10 h-10 flex items-center justify-center top-1/2  -translate-y-1/2 bg-white shadow-lg rounded-full hover:bg-green-100 transition-all cursor-pointer' onClick={() => scroll('right')}>
        <ChevronRight className='w-6 h-6 text-green-700'/>
      </button>}
      
      
    </motion.div>
  )
}

export default CategorySlider
