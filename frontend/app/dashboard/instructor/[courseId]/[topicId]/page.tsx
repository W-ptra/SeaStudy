"use client"

import React from 'react'
import { usePathname } from 'next/navigation';

// Dummy Data Import
import { course } from '../../data';
import { getLastPathSegment } from '@/lib/utils';

// Components Import
import { Button } from '@/components/ui/button';

const TopicDetailPage = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)
  const courseData = course.find(item => item.topics.some(topic => topic.title === lastPathname));
  const topicData = courseData?.topics.find(topic => topic.title === lastPathname);
  
  // @ts-ignore
  const { title, description, materials, assignment } = topicData;

  function deleteCourseHandler() {
    console.log("Course Deleted")
  }

  return (
    <div className='space-y-8'> 

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold'>{title}</h3>
          <p className='text-black/75'>{description}</p>

        </div>
        <div className='flex gap-x-4'>
          <Button variant={'destructive'} onClick={deleteCourseHandler}>
            Delete Course
          </Button>
        </div>
      </div>

      {/* Materials */}
    </div>
  )
}

export default TopicDetailPage