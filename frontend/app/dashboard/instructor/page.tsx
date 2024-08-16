"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Component Import
import CreateCourse from '@/components/dashboard/CreateCourse'

// Card Import
import {
  Card,
  CardContent,
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
        <h3 className='text-3xl font-bold'>My Course</h3>
        <CreateCourse />
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses && courses.map((item, index) => {
          return (
            <Card key={item.id} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className={cn(
                    'rounded-full bg-gray-50 border py-1 px-4',
                    item.level === 'easy' && 'bg-green-50 border border-green-300',
                    item.level === 'medium' && 'bg-orange-50 border border-orange-300',
                    item.level === 'hard' && 'bg-red-50 border border-red-300'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 border py-1 px-4'>{item.category}</p>
                </CardContent>
              </div>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <p>Rp {item.price}</p>
                <Link href={`/dashboard/instructor/${item.id}`}>
                  <Button size={'sm'} variant={'secondary'}>
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