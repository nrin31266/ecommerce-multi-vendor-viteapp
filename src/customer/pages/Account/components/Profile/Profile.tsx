import { Box, Divider } from '@mui/material'
import React from 'react'
import UserDetailsField from './components/UserDetailsField/UserDetailsField'
import { useAppSelector } from '../../../../../states/store'

const Profile = () => {
  const user = useAppSelector(store => store.auth.user)
  return (
    <Box className="flex justify-center py-10">
        <section className='lg:w-[70%] w-full '>
            <h1 className='text-2xl font-bold text-gray-600'>Personal Details</h1>
            <div className='mt-8'>
                <UserDetailsField label="Name" value={user?.fullName}/>
                <Divider/>
                <UserDetailsField label="Email" value={user?.email}/>
                <Divider/>
                <UserDetailsField label="Phone" value={user?.mobile}/>
            </div>
        </section>
    </Box>
  )
}

export default Profile