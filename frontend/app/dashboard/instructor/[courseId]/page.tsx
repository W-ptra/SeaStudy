"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn, getLastPathSegment } from '@/lib/utils';

// Components Input
import CreateTopic from '@/components/dashboard/CreateTopic';

// Button Import
import { Button } from '@/components/ui/button';

// Dummy Data Import
import { course } from '../data';

// Card Import
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Alert Dialog Import
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { CourseDataType, TopicDataType } from '@/lib/schemas';

const CourseDetailPage = () => {
  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const courseId = parseInt(lastPathname)
  // const data = course.find(item => item.name === lastPathname)
  // @ts-ignore
  // const { name, description, category, level } = data

  function handleDeleteCourse() {
    console.log("Course Deleted")
    toast("Course Deleted")
  }

  const [courseDetail, setCourseDetail] = useState<CourseDataType>()
  const [topics, setTopics] = useState<TopicDataType[]>([])

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
          <h3 className='text-3xl font-bold'>{courseDetail?.name}</h3>
          <p className='text-black/75'>{courseDetail?.description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full bg-gray-50 border py-1 px-4',
              courseDetail?.level === 'easy' && 'bg-green-50 border border-green-300',
              courseDetail?.level === 'medium' && 'bg-orange-50 border border-orange-300',
              courseDetail?.level === 'hard' && 'bg-red-50 border border-red-300'  
            )}>{courseDetail?.level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{courseDetail?.category}</p>
          </div>
        </div>
        <div className='flex gap-x-4'>
          <CreateTopic />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'}>
                Delete Course
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the topic
                  and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-500 hover:bg-red-400' onClick={handleDeleteCourse}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Topics */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {topics.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                {/* <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className='rounded-full py-1 px-4 bg-blue-100 border border-blue-300'>{item.materials.length > 0 ? item.materials.length : 0} Materials</p>
                </CardContent> */}
              </div>
              <CardFooter>
                <Link href={`/dashboard/instructor/${lastPathname}/${item.title}`}>
                  <Button size={'sm'} variant={'secondary'}>
                    Manage Topic
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

export default CourseDetailPage