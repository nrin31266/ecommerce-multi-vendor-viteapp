import React, { ReactNode } from 'react'



const Title = ({children}: {children:ReactNode}) => {
  return (
    <h1 className={`text-4xl font-bold text-[var(--primary-color)] text-center lg:pb-20`}>
        {children}
    </h1>
  )
}

export default Title