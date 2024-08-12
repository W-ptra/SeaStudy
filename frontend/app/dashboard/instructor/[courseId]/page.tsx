"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

// Component Import
import { Button } from '@/components/ui/button';

// Dummy Data Import
import { course } from '../data';

// Helper function
function getLastPathSegment() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const lastSegment = segments.pop() || '';
  return decodeURIComponent(lastSegment);
}

const CourseDetailPage = () => {
  const pathname = getLastPathSegment()
  const data = course.find(item => item.name === pathname)
  // @ts-ignore
  const { name, description, category, level, price } = data

  function deleteCourseHandler() {
    console.log("Course Deleted")
  }

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold'>{name}</h3>
          <p className='text-black/75'>{description}</p>
          <div className='flex gap-x-4'>
            <p className={cn(
              'rounded-full bg-gray-50 border py-1 px-4',
              level === 'Easy' && 'bg-green-50 border border-green-300',
              level === 'Medium' && 'bg-orange-50 border border-orange-300',
              level === 'Hard' && 'bg-red-50 border border-red-300'  
            )}>{level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{category}</p>
          </div>
        </div>
        <Button variant={'destructive'} onClick={deleteCourseHandler}>
          Delete Course
        </Button>
      </div>
    </div>
  )
}

export default CourseDetailPage