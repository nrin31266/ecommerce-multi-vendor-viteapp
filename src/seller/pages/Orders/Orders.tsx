import React from 'react'
import OrderTable from './components/OrderTable/OrderTable'

const Orders = () => {
  return (
    <div>
        <h1 className='font-bold mb-5 text-xl'>All orders</h1>
        <OrderTable/>
    </div>
  )
}

export default Orders