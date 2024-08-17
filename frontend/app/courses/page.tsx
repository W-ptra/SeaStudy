"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Icon Import
import { BookPlus } from 'lucide-react';
import { Star } from 'lucide-react';

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

//  Dialog Import
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CoursesPage = () => {
  const [session, setSession] = useState()
  const [userRole, setUserRole] = useState()
  const [courses, setCourses] = useState<CourseDataType[]>([])
  const [userId, setUserId] = useState()
  const router = useRouter()

  type reviewType = {
    comment: string
    rating: number
  }
  const [reviews, setReviews] = useState<reviewType[]>([])

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

      if (response.ok) {
        toast.success('Successfully enrolled the course')
        router.push(`/dashboard/${userId}`)
      } else {
        toast.error('Failed to enroll the course') 
      }
    } catch (error: any) {
      toast.error('   Error while enrolling the course', error) 
    }
  }

  async function getReviewByCourseId(courseId: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/review/course/${courseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log(data.reviews)
      setReviews(data.reviews)
    } catch (error: any) {
      toast.error('Error get review by courseId: ', error)
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
                <div className='flex flex-col md:flex-row gap-4'>
                  {session && userRole === 'User' && (
                    <Button 
                      className='bg-white hover:bg-white w-[200px] text-black rounded-full shadow-custom flex gap-2 hover:gap-4 transition-all' 
                      onClick={() => {
                        console.log(item.id, item.price)
                        const courseId = item.id
                        console.log(item.id)
                        buyCourseHandler(courseId)
                      }}
                    >
                      Enroll This Course <BookPlus className='w-5 h-5' />
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger 
                      onClick={() => {
                        getReviewByCourseId(item.id)
                      }}
                    >
                      See Review
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {item.name} Review
                        </DialogTitle>
                      </DialogHeader>
                      <ul className='flex flex-col gap-y-2'>
                        {reviews.map((item, index) => {
                          return (
                            <li key={index} className='bg-white/20 border-2 py-2 px-4 rounded-md flex gap-x-4'>
                                <p>{item.comment}</p>
                                <p className='text-medium flex items-center gap-x-2'>{item.rating} <span><Star className='w-4 h-4' /></span></p>
                            </li>
                          )
                        })}
                      </ul>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CoursesPage