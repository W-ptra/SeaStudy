import SnowfallComponent from '@/components/Snowfall'
import React, { ReactNode } from 'react'

const ForumLayout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className='wrapper mt-[100px] min-h-screen'>
      <SnowfallComponent />
      {children}
    </div>
  )
}

export default ForumLayout