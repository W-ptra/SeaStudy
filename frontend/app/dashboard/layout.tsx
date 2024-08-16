import React, { ReactNode } from 'react'

// Snowfall Import
import SnowfallComponent from '@/components/Snowfall'

const DashboardLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='min-h-screen wrapper mt-[100px]'>
      <SnowfallComponent />
      {children}
    </div>
  )
}

export default DashboardLayout