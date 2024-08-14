import React, { ReactNode } from 'react'

const CoursesLayout = ({
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

export default CoursesLayout