import React from 'react'
import UserAddressCard from './components/UserAddressCard/UserAddressCard'

const Address = () => {
  return (
    <div className='space-y-5'>
        {[1,1,1,1,1,1].map((item)=><UserAddressCard/>)}
    </div>
  )
}

export default Address