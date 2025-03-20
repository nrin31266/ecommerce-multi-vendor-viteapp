import React from 'react'
import ShopByCategoryCard from './components/ShopByCategoryCard/ShopByCategoryCard'

const ShopByCategory = () => {
  return (
    <div className='lg:px-20 grid grid-cols-2 mt-8 gap-4 md:grid-cols-4 lg:grid-cols-5'>
        {
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,].map((item)=><ShopByCategoryCard/>)
        }
    </div>
  )
}

export default ShopByCategory