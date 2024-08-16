"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';
import { getLastPathSegment } from '@/lib/utils';

// Card Import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Component Import
import { Button } from '@/components/ui/button'

// Icons Import
import { BookCopy } from 'lucide-react';

// Dummy Data Import
import { course } from './data';

// Import Utilities
import { toast } from 'sonner';
import CountUp from 'react-countup';
import { CourseDataType, UserDataType } from '@/lib/schemas';

const UserDashboard = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)

  const [courses, setCourses] = useState<CourseDataType[]>([])
  const [userData, setUserData] = useState<UserDataType>()

  useEffect(() => {
    async function getEnrolledCourses() {
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
          console.log(data);
          
          setCourses(data)
        } else {
          toast.error('Failed to fetch courses')
        }
      } catch (error: any) {
        toast.error('Error fetching courses:', error)
      }
    }
    async function getUserData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserData(data.data)
        } else {
          toast.error('Failed to fetch user data')
        }
      } catch (error: any) {
        toast.error('Error fetching user:', error)
      }
    }

    getEnrolledCourses()
    getUserData()
  }, [])

  function handleDeleteCourse() {
    console.log("Course Deleted")
    toast("Course Deleted")
  }

  return (
    <div className='space-y-8'>

      {/* User Data */}
      <Card>
        <CardHeader className='w-full flex'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl font-bold'>{userData?.name}</h3>
              <div className='text-muted-foreground'>
                {userData?.email}
              </div>
            </div>
            <div className='flex flex-col items-center w-[180px] '>
              <p className='text-muted-foreground'>Balance</p>
              <div className='text-muted-foreground text-2xl font-bold'>
                Rp <CountUp end={userData?.credit} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='text-3xl font-bold'>My Courses</h3>
        <Link href="/">
          <Button className='w-[150px] bg-blue-500 hover:bg-blue-400 flex items-center gap-2 hover:gap-4 transition-all justify-center'>
            Buy Courses <BookCopy className='h-5 w-5' />
          </Button>
        </Link>
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
                <p>$ {item.price}</p>
                <div className='flex items-center gap-x-4'>
                  <Link href={`/dashboard/${lastPathname}/${item.id}`}>
                    <Button size={'sm'} className='bg-blue-500 hover:bg-blue-400'>
                      Course Detail
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default UserDashboard