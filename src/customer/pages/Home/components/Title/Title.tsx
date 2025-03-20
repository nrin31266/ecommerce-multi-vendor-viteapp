import React, { ReactNode } from 'react'



const Title = ({children, level}: {children:ReactNode,
    level?: "1" | "2" | "3" | "4";
}) => {
  return (
    <h1 className={`text-${level??"4"}xl font-bold text-[var(--primary-color)] text-center lg:pb-20`}>
        {children}
    </h1>
  )
}

export default Title