import { Divider } from '@mui/material'
import React from 'react'

const UserDetailsField = ({ label, value }: any) => {
  return (
    <div className="bg-gray-50 grid grid-cols-12 items-center px-3 py-5">
      <span className="col-span-3 text-left px-5">{label}</span>
      <Divider className="col-span-1" orientation="vertical" flexItem />
      <span className="col-span-8 px-5 font-semibold">{value}</span>
    </div>
  );
};

export default UserDetailsField;
