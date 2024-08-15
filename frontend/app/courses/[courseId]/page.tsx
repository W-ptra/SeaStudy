"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn, getLastPathSegment } from '@/lib/utils';

// Card Import
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Icons Import
import { Star } from 'lucide-react';

// Button Import
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CourseDetailDataType } from '@/lib/schemas';

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState<CourseDetailDataType>()

  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const courseId = parseInt(lastPathname)

  useEffect(() => {
    async function getCourseDetail(courseId: number) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setCourseDetail(data)
        } else {
          toast.error('Failed to fetch course detail')
        }
      } catch (error: any) {
        toast.error('Error fetching course detail:', error)
      } 
    }

    getCourseDetail(courseId)
  }, [])

  return (
    <div className='space-y-8'>

      {/* Header */}

      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold'>{courseDetail?.course.name}</h3>
          <p className='text-black/75'>{courseDetail?.course.description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full bg-gray-50 border py-1 px-4',
              courseDetail?.course.level === 'easy' && 'bg-green-50 border border-green-300',
              courseDetail?.course.level === 'medium' && 'bg-orange-50 border border-orange-300',
              courseDetail?.course.level === 'hard' && 'bg-red-50 border border-red-300'  
            )}>{courseDetail?.course.level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{courseDetail?.course.category}</p>
            Rating : {courseDetail?.course.avgRating}
          </div>
        </div>
      </div>

      {/* Topics */}
      {/* <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courseDetail?.course.topics.map((item, index) => {
          return (
            <Card key={index} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className='rounded-full py-1 px-4 bg-blue-100 border border-blue-300'>{item.materials.length > 0 ? item.materials.length : 0} Materials</p>
                </CardContent>
              </div>
              <CardFooter>
                <Link href={`/courses/${lastPathname}/${item.title}`}>
                  <Button size={'sm'} className='bg-blue-500 hover:bg-blue-400'>
                    See Materials
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div> */}

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <h3 className='text-3xl font-bold'>Rating</h3>
      </div>

      {/* Rating */}
      {/* <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data?.reviews.map((item, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.reviewer}</CardTitle>
                <CardDescription>{item.comment}</CardDescription>
              </CardHeader>
              <CardContent className='flex items-center gap-x-2 font-semibold'>
                {item.rating} <Star className='h-4 w-4' />
              </CardContent>
            </Card>
          )
        })}
      </div> */}

    </div>
  )
}

export default CourseDetail