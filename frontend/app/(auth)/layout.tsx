import React, { ReactNode } from 'react'

// Snowfall Import
import SnowfallComponent from '@/components/Snowfall'

const AuthLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='wrapper flex items-center justify-center h-screen'>
      <SnowfallComponent />
      {children}
    </div>
  )
}

export default AuthLayout