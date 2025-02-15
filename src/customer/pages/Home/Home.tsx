import React from 'react'
import ElectricCategories from './components/ElectricCategories/ElectricCategories'
import CategoryGrid from './components/CategoryGrid/CategoryGrid'

const Home = () => {
  return (
    <>
        <div className='space-y-5 lg:space-y-10 relative pb-20'>
            <ElectricCategories/>
            <CategoryGrid/>
        </div>
    </>
  )
}

export default Home