import { FormikProps } from 'formik';
import React from 'react'
import { BecomeSellerFormValue } from '../../SellerAccountForm';
import { TextField } from '@mui/material';

const SellerAccountFormStep5 = ({
  formik,
}: {
  formik: FormikProps<BecomeSellerFormValue>;
}) => {
  return (
      <div>
          <p className="text-xl font-bold text-center pb-9">
            Verify
          </p>
          <div className="grid grid-cols-12 gap-5">
             <div className="col-span-12">
              <TextField
                fullWidth
                disabled={true}
                required
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email &&
                  Boolean(formik.errors.email)
                }
                helperText={
                  formik.touched.email &&
                  formik.errors.email
                }
              />
            </div>
            <div className="col-span-12">
              <TextField
                fullWidth
                required
                name="otp"
                label="OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                error={
                  formik.touched.otp &&
                  Boolean(formik.errors.otp)
                }
                helperText={
                  formik.touched.otp &&
                  formik.errors.otp
                }
              />
            </div>
           
          </div>
        </div>
  )
}

export default SellerAccountFormStep5