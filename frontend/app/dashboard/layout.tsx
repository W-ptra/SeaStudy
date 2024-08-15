import React, { ReactNode } from 'react'

const DashboardLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='wrapper mt-[100px]'>
      {children}
    </div>
  )
}

export default DashboardLayout