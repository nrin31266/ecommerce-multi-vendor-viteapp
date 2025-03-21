import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../states/store';
import { paymentSuccess } from '../../../../states/customer/orderSlide';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const {orderId} = useParams();
    const dispatch = useAppDispatch()


    // useEffect(() => {
    //   dispatch(paymentSuccess({}))
    // }, [orderId]);


    return (
      <div className='min-h-[90vh] flex justify-center items-center'>
        <div className='bg-green-700 text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center'>
          <h1 className='text-3xl font-semibold'>Congratulations!</h1>
          <h1 className='text-2xl font-semibold'>your order get success</h1>
    
          <div>
            <Button 
              color='secondary' 
              variant='contained' 
              onClick={() => navigate("/")}
            >
              Shopping More
            </Button>
          </div>
        </div>
      </div>
    );
    
}

export default PaymentSuccess