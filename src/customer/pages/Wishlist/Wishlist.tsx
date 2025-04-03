import React, { useEffect } from 'react'
import WishlistProductCard from './components/WishlistProductCard/WishlistProductCard'
import { useAppDispatch, useAppSelector } from '../../../states/store'
import { fetchWishlistByUser } from '../../../states/customer/wishlistSlide'

const Wishlist = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchWishlistByUser())
  }, []);
  const wishlist = useAppSelector((store) => store.wishlist);

  return (
    <div className='p-5 lg:p-20'>
        <section>
            <h1 className='text-2xl'><strong>My Wishlist: </strong> {wishlist.wishlist?.products.length}</h1>
            <div className='pt-10 flex flex-wrap gap-5'>
                {wishlist.wishlist?.products.map((item)=><WishlistProductCard item={item}/>)}
            </div>
        </section>
    </div>
  )
}

export default Wishlist