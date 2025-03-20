import React from 'react'
import ShopByCategoryCard from './components/ShopByCategoryCard/ShopByCategoryCard'

const ShopByCategory = () => {
  return (
    <div className='flex flex-wrap justify-start gap-4 lg:px-20'>
        {
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,].map((item)=><ShopByCategoryCard/>)
        }
    </div>
  )
}

export default ShopByCategory