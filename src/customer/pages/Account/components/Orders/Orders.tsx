import React, { useEffect } from 'react'
import OrderItem from '../OrderItem/OrderItem'
import { useAppDispatch, useAppSelector } from '../../../../../states/store'
import { fetchUserOrderHistory } from '../../../../../states/customer/orderSlide';
import OrderComponent from '../OrderComponent/OrderComponent';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orderStore = useAppSelector((store) => store.order);
  useEffect(() => {
    dispatch(fetchUserOrderHistory());
  }, []);
  return (
    <div className='text-sm min-h-screen'>
        <div className="pb-5">
            <h1 className='font-semibold'>All Orders</h1>
            <p>form anytime</p>
        </div>
        <div className='space-y-5'>
            {orderStore.orders.flatMap((o, index)=> <OrderComponent order={o} key={index}/>)}
        </div>
    </div>
  )
}

export default Orders