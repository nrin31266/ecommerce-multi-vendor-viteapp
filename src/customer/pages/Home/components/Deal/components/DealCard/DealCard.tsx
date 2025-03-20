import React from 'react'

const DealCard = () => {
  return (
    <div className='cursor-pointer min-w-[13rem]'>
        <img
        className='border-x-[7px] border-t-[7px] border-yellow-500 h-[12rem] w-full object-cover object-top'
        src="https://th.bing.com/th/id/OIP.HfDaw-1w0DpMnKa0e5FcBQHaHa?rs=1&pid=ImgDetMain" alt="" />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>Smart Phone</p>
            <p className='text-2xl font-bold'>20% OFF</p>
            <p className='text-lg'>Shop now</p>
        </div>
    </div>
  )
}

export default DealCard