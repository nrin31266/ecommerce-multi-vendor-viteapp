import React from 'react'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'

const SellerDashboard = () => {

    const handleToggleDrawer = ()=>{

    }

  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <SellerDrawerList toggleDrawer={handleToggleDrawer}/>
            </section>
            <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
                seller router
            </section>
        </div>
    </div>
  )
}

export default SellerDashboard