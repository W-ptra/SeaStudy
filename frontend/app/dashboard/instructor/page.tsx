import CreateCourse from '@/components/dashboard/CreateCourse'
import React from 'react'

const InstructorDashboard = () => {
  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='text-3xl font-bold'>My Course</h3>
        <CreateCourse />
      </div>

      {/* Courses */}
      <div>
        
      </div>
    </div>
  )
}

export default InstructorDashboard