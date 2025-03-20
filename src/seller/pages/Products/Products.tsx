import React from 'react'
import ProductTable from './components/ProductTable/ProductTable'
import { useAppDispatch } from '../../../states/store'
import { setTheme } from '../../../states/system/themeModeSlide';

const Products = () => {


  return (
    <div>
      <h1 className='font-bold text-xl mb-5'>Products</h1>
      <ProductTable/>
    </div>
  )
}

export default Products