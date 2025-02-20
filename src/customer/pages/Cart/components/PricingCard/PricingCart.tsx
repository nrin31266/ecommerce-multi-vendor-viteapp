import { Divider } from '@mui/material'
import React from 'react'

const PricingCart = () => {
  return (
    <>
    <div className='space-y-3 p-5'>
        <div className='flex justify-between item-center'>
          <span>Subtotal</span>
          <span>762</span>
        </div> 
        <div className='flex justify-between item-center'>
          <span>Discount</span>
          <span>762</span>
        </div> 
        <div className='flex justify-between item-center'>
          <span>Shipping</span>
          <span>762</span>
        </div> 
        <div className='flex justify-between item-center'>
          <span>Plateform</span>
          <span>Free</span>
        </div> 

        
    </div>
    <Divider/>

        <div className='flex justify-between item-center p-5 text-[var(--primary-color)]'>
          <span>Total</span>
          <span>345</span>
        </div> 
    </>
  )
}

export default PricingCart