"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Icon Import
import { BookPlus } from 'lucide-react';

// Card Import
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// Button Import
import { Button } from '@/components/ui/button';

// Toast Import
import { toast } from 'sonner';

// Type Import
import { CourseDataType } from '@/lib/schemas';

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
import { useRouter } from 'next/navigation';

const CoursesPage = () => {
  const [session, setSession] = useState()
  const [userRole, setUserRole] = useState()
  const [courses, setCourses] = useState<CourseDataType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState()
  const router = useRouter()

  useEffect(() => {
    // @ts-ignore
    setSession(localStorage.getItem('token'))
    // @ts-ignore
    setUserRole(localStorage.getItem("userRole"))
    // @ts-ignore
    setUserId(localStorage.getItem("userId"))
  }, [])

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/course/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCourses(data.courses)
        } else {
          toast.error('Failed to fetch courses')
        }
      } catch (error: any) {
        toast.error('Error fetching courses:', error)
      }
    }

    getAllCourses()
  }, [])

  const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  async function buyCourseHandler(courseId: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/payment/course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId
        })
      })

      console.log(response)
  
      if (response.ok) {
        setIsOpen(false)
        toast.success('Successfully enrolled the course')
        router.push(`/dashboard/${userId}`)
      } else {
        toast.error('Failed to enroll the course') 
      }
    } catch (error: any) {
      toast.error('   Error while enrolling the course', error) 
    }
  }

  return (
    <div className='space-y-8 min-h-screen'>
      
      {/* Header */}
      <div className='w-full flex items-center justify-center'>
        <h3 className='text-3xl font-bold text-white'>
          Courses
        </h3>
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((item, index) => {
          return (
            <Card key={index} className='flex flex-col justify-between bg-white/20 border-2 border-white shadow-custom'>
              <div>
                <CardHeader>
                  <CardTitle className='text-white'>{item.name}</CardTitle>
                  <CardDescription className='text-white/70'>{truncateDescription(item.description, 30)}</CardDescription>
                </CardHeader>
              </div>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <div className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className={cn(
                    'rounded-full text-white font-medium py-1 px-4 max-w-[100px] md:max-w-none text-center md:text-start',
                    item.level === "easy" && 'bg-green-400',
                    item.level === "medium" && 'bg-orange-400',
                    item.level === 'hard' && 'bg-red-400'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 border py-1 px-4 shadow-custom max-w-[100px] md:max-w-none text-center md:text-start'>{item.category}</p>
                </div>
                <p className='text-white font-medium text-xl px-4 py-1 rounded-full bg-white/20 border border-white'>$ {item.price}</p>
                {session && userRole === 'User' && (
                  <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                      <Button className='bg-white hover:bg-white w-[200px] text-black rounded-full shadow-custom flex gap-2 hover:gap-4 transition-all'>
                        Enroll This Course <BookPlus className='w-5 h-5' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Enroll This Course for ${item.price}</AlertDialogTitle>
                        <AlertDialogDescription>Do you want to buy this course for ${item.price}?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={async () => {
                            const courseId = item.id
                            buyCourseHandler(courseId)
                          }}
                        >
                          Sure!
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CoursesPage