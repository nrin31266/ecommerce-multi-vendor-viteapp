import React from 'react'
import ElectricCategories from './components/ElectricCategories/ElectricCategories'
import CategoryGrid from './components/CategoryGrid/CategoryGrid'
import Deal from './components/Deal/Deal'

const Home = () => {
  return (
    <>
        <div className='space-y-5 lg:space-y-10 relative pb-20'>
            <ElectricCategories/>
            <CategoryGrid/>
            <Deal/>
        </div>
    </>
  )
}

export default Home