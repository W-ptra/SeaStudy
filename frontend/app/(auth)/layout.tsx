import React, { ReactNode } from 'react'

const AuthLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='wrapper flex items-center justify-center h-full'>
      {children}
    </div>
  )
}

export default AuthLayout