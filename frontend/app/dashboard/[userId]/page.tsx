"use client"

import React from 'react'
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

import { toast } from 'sonner';

const UserDashboard = () => {
  const pathname = usePathname()
  const lastPathname = getLastPathSegment(pathname)

  function handleDeleteCourse() {
    console.log("Course Deleted")
    toast("Course Deleted")
  }

  return (
    <div className='space-y-8'>

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
        {course.map((item, index) => {
          return (
            <Card key={index} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className={cn(
                    'rounded-full bg-gray-50 border py-1 px-4',
                    item.level === 'Easy' && 'bg-green-50 border border-green-300',
                    item.level === 'Medium' && 'bg-orange-50 border border-orange-300',
                    item.level === 'Hard' && 'bg-red-50 border border-red-300'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 border py-1 px-4'>{item.category}</p>
                </CardContent>
              </div>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <p>$ {item.price}</p>
                <div className='flex items-center gap-x-4'>
                  <Link href={`/dashboard/${lastPathname}/${item.name}`}>
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