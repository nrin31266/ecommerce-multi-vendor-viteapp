import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.checked);
    }


  return (
    <div className='flex border border-gray-200 rounded-md p-3'>
        <div>
            <Radio name='radio-button' value="" onChange={handleChange} checked={true}/>
        </div>
        <div className='space-y-3 pt-3'>
            <h1 className='text-sm'>Zosh</h1>
            <p className='w-[320px]'>Duy Thanh, Duy Xuyen, Quang Nam - 239219</p>
            <p><strong>Mobile: </strong>8732473874789</p>
        </div>
    </div>
  )
}

export default AddressCard