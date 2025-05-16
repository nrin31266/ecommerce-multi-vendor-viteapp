import { Divider } from '@mui/material'
import React from 'react'

const UserDetailsField = ({ label, value, hasBottomBorder }: { label: string, value: string | React.ReactNode, hasBottomBorder?: boolean }) => {
  return (
    <div className={`bg-gray-50 grid grid-cols-12 items-center px-3 py-5
    ${hasBottomBorder === false? "" : "border-b border-gray-200"}
    `}>
      <div className="col-span-3 text-left px-5">{label}</div>
      <Divider className="col-span-1" orientation="vertical" flexItem />
      <div className="col-span-8 px-5 font-semibold">{value}</div>
    </div>
  );
};

export default UserDetailsField;
