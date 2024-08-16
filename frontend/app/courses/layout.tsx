import React, { ReactNode } from 'react'

// Snowfall Import
import SnowfallComponent from '@/components/Snowfall'

const CoursesLayout = ({
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

export default CoursesLayout