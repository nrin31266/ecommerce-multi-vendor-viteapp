import React from 'react'
import WishlistProductCard from './components/WishlistProductCard/WishlistProductCard'

const Wishlist = () => {
  return (
    <div className='p-5 lg:p-20'>
        <section>
            <h1><strong>My Wishlist: </strong> 5 items</h1>
            <div className='pt-10 flex flex-wrap gap-5'>
                {[1,1,1,1,1].map((item)=><WishlistProductCard/>)}
            </div>
        </section>
    </div>
  )
}

export default Wishlist