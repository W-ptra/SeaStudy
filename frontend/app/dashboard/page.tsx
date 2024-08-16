import React from 'react'
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <Link href={`/dashboard/user`}>User</Link>
      <Link href={`/dashboard/instructor`}>Instructor</Link>
    </div>
  )
}

export default DashboardPage