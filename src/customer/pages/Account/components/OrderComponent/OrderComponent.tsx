import React from 'react'
import { IOrder } from './../../../../../types/OrderTypes';
import OrderItem from '../OrderItem/OrderItem';

interface IOrderComponentProps {
    order: IOrder
}

const OrderComponent = ({order}: IOrderComponentProps) => {
  return (
    <div className='space-y-1 border-1 border-gray-200 rounded-md'>
      {
        order.orderItems.map((item, index)=><OrderItem item={item} order={order} key={index}/>)
      }
    </div>
  )
}

export default OrderComponent