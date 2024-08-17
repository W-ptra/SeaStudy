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
import { CourseDataType, TopicDataType } from '@/lib/schemas';

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState<CourseDataType>()
  const [topics, setTopics] = useState<TopicDataType[]>([])

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
          setCourseDetail(data.course)
          setTopics(data.topics)
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
          <h3 className='text-3xl font-bold text-white flex gap-x-4'>{courseDetail?.name} <span className='flex gap-x-2 items-center'>({courseDetail?.avgRating} <Star className='h-6 w-6' />)</span></h3>
          <p className='text-white/75'>{courseDetail?.description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full py-1 px-4 text-white',
              courseDetail?.level === 'easy' && 'bg-green-400',
              courseDetail?.level === 'medium' && 'bg-orange-400',
              courseDetail?.level === 'hard' && 'bg-red-400'  
            )}>{courseDetail?.level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{courseDetail?.category}</p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {topics.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between bg-white/20 border-2 shadow-custom'>
              <div>
                <CardHeader>
                  <CardTitle className='text-white'>{item.title}</CardTitle>
                  <CardDescription className='text-white/70'>{item.description}</CardDescription>
                </CardHeader>
              </div>
              <CardFooter>
                <Link href={`/courses/${lastPathname}/${item.id}`}>
                  <Button size={'sm'} className='bg-white hover:bg-white rounded-full shadow-custom text-black'>
                    See Materials
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>

    </div>
  )
}

export default CourseDetail