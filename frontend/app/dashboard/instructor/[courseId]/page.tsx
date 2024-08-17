"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { cn, getLastPathSegment } from '@/lib/utils';

// Components Input
import CreateTopic from '@/components/dashboard/CreateTopic';

// Button Import
import { Button } from '@/components/ui/button';

// Card Import
import { 
  Card, 
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
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const courseId = parseInt(lastPathname)
  const router = useRouter()

  async function handleDeleteCourse() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type' : 'application/json'
        }
      })

      if (response.ok) {
        toast.success('Successfully delete the course')
        router.push('/dashboard/instructor/')
      } else {
      toast.error('Failed to delete the course')
      }
    } catch (error: any) {
      toast.error('Error deleting the course:', error)
    }
  }

  const [courseDetail, setCourseDetail] = useState<CourseDataType>()
  const [topics, setTopics] = useState<TopicDataType[]>([])

  useEffect(() => {
    async function getCourseDetail(courseId: number) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type' : 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setCourseDetail(data.course)
          setTopics(data.topics)
          console.log(courseDetail)
          console.log(topics)
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
          <h3 className='text-3xl font-bold text-white'>{courseDetail?.name}</h3>
          <p className='text-white/75'>{courseDetail?.description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full text-white py-1 px-4',
              courseDetail?.level === 'easy' && 'bg-green-400',
              courseDetail?.level === 'medium' && 'bg-orange-400',
              courseDetail?.level === 'hard' && 'bg-red-400'  
            )}>{courseDetail?.level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{courseDetail?.category}</p>
          </div>
        </div>
        <div className='flex gap-x-4'>
          <CreateTopic />
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'} className='rounded-full'>
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
                <AlertDialogAction className='bg-red-500 hover:bg-red-400' onClick={handleDeleteCourse}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Topics */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {topics.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between bg-white/20 border-white shadow-custom'>
              <div>
                <CardHeader>
                  <CardTitle className='text-white'>{item.title}</CardTitle>
                  <CardDescription className='text-white/70'>{item.description}</CardDescription>
                </CardHeader>
              </div>
              <CardFooter>
                <Link href={`/dashboard/instructor/${lastPathname}/${item.id}`}>
                  <Button size={'sm'} variant={'secondary'} className='rounded-full shadow-custom w-[200px]'>
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