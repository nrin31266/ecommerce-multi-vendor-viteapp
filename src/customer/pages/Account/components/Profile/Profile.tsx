import { Box, Divider } from '@mui/material'
import React from 'react'
import UserDetailsField from './components/UserDetailsField/UserDetailsField'

const Profile = () => {
  return (
    <Box className="flex justify-center py-10">
        <section className='lg:w-[70%] w-full '>
            <h1 className='text-2xl font-bold text-gray-600'>Personal Details</h1>
            <div className='mt-8'>
                <UserDetailsField label="Name" value="Rohit Kumar wergyew"/>
                <Divider/>
                <UserDetailsField label="Email" value="X7Y2a@example.com"/>
                <Divider/>
                <UserDetailsField label="Phone" value="1234567890"/>
            </div>
        </section>
    </Box>
  )
}

export default Profile