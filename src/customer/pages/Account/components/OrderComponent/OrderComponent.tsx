import React from 'react'
import { IOrder } from './../../../../../types/OrderTypes';
import OrderItem from '../OrderItem/OrderItem';

interface IOrderComponentProps {
    order: IOrder
}

const OrderComponent = ({order}: IOrderComponentProps) => {
  return (
    <div className='space-y-5 border-2 border-gray-200 rounded-md p-6'>
      {
        order.orderItems.map((item, index)=><OrderItem item={item} order={order} key={index}/>)
      }
    </div>
  )
}

export default OrderComponent