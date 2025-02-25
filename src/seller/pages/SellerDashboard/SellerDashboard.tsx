import React from 'react'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'
import { Outlet } from 'react-router-dom'

const SellerDashboard = () => {

    const handleToggleDrawer = ()=>{

    }

  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <SellerDrawerList toggleDrawer={handleToggleDrawer}/>
            </section>
            <section className='p-10 w-full lg:w-[100%] overflow-y-auto'>
                <Outlet/>
            </section>
        </div>
    </div>
  )
}

export default SellerDashboard