import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function TrackOrder({ params } : { params: { orderId: string } } ) {

    const { orderId } = useParams()

    useEffect(()=>{
        const getOrder=async ()=>{
            try {
                const result=await axios.get(`/api/user/get-order/${orderId}`)
                console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }
    
    }, [])

  return (
    <div className=''>
      
    </div>
  )
}

export default TrackOrder
