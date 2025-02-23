import React from 'react'
import OrderItem from '../OrderItem/OrderItem'

const Orders = () => {
  return (
    <div className='text-sm min-h-screen'>
        <div className="pb-5">
            <h1 className='font-semibold'>All Orders</h1>
            <p>form anytime</p>
        </div>
        <div>
            {[1,1,1,1,1,1,1].map((item)=><OrderItem/>)}
        </div>
    </div>
  )
}

export default Orders