import React, { ReactNode } from 'react'

const AuthLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='mt-[100px] wrapper flex items-center justify-center h-[64vh]'>
      {children}
    </div>
  )
}

export default AuthLayout