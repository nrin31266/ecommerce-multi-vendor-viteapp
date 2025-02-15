import React from 'react'
import ElectricCategoryCard from '../ElectricCategoryCard/ElectricCategoryCard'

const ElectricCategories = () => {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {
            [1,1,1,1,1,1,1].map((item)=><ElectricCategoryCard/>)
        }
    </div>
  )
}

export default ElectricCategories