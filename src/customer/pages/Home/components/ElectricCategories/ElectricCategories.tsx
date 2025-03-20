import React from 'react'
import ElectricCategoryCard from '../ElectricCategoryCard/ElectricCategoryCard'

const ElectricCategories = () => {
  return (
    <div className='flex flex-nowrap overflow-auto justify-between gap-4 py-5 lg:px-20 border-b border-b-gray-200'>
        {
            [1,1,1,1,1,1,1].map((item)=><ElectricCategoryCard/>)
        }
    </div>
  )
}

export default ElectricCategories