"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Component Import
import CreateCourse from '@/components/dashboard/CreateCourse'

// Card Import
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Button Import
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Dummy Data Import
import { CourseDataType } from '@/lib/schemas'
import { toast } from 'sonner'

const InstructorDashboard = () => {

  const [courses, setCourses] = useState<CourseDataType[]>([])

  const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  useEffect(() => {
    // async function getUserData() {
    //   try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user`, {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     })

    //     if (response.ok) {
    //       const data = await response.json()
    //       setUserData(data.data)
    //     } else {
    //       toast.error('Failed to fetch user data')
    //     }
    //   } catch (error: any) {
    //     toast.error('Error fetching user:', error)
    //   }
    // }

    async function getCreatedCourses(){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/course/`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCourses(data)
        } else {
          toast.error('Failed to fetch courses')
        }
      } catch (error: any) {
        toast.error('Error fetching courses:', error)
      }
    }

    getCreatedCourses();
  }, [])

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='text-3xl font-bold text-white'>My Course</h3>
        <CreateCourse />
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses && courses.map((item, index) => {
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
                    item.level === "easy"  && 'bg-green-400',
                    item.level === "medium" && 'bg-orange-400',
                    item.level === 'hard' && 'bg-red-400'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 border py-1 px-4 shadow-custom max-w-[200px] md:max-w-none text-center md:text-start'>{item.category}</p>
                </div>
                <p className='text-white font-medium text-xl px-4 py-1 rounded-full bg-white/20 border border-white'>$ {item.price}</p>
                <Link href={`/courses/${item.id}`}>
                  <Button className='bg-white hover:bg-white w-[200px] text-black rounded-full shadow-custom flex gap-2 hover:gap-4 transition-all'>
                    Manage Course
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

export default InstructorDashboard