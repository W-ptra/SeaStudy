import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Icon Import
import { BookPlus } from 'lucide-react';

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
import { Button } from '@/components/ui/button';

// Toast Import
import { toast } from 'sonner';

// Type Import
import { CourseDataType } from '@/lib/schemas';

const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseDataType[]>([])

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await fetch('/api/course/', {
          method: 'GET',
          headers: {
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
  }, [])

  return (
    <div className='space-y-8'>
      
      {/* Header */}
      <div className='w-full flex items-center justify-center'>
        <h3 className='text-3xl font-bold'>
          Courses
        </h3>
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((item, index) => {
          return (
            <Card key={index} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className={cn(
                    'rounded-full bg-gray-50 border py-1 px-4',
                    item.level === "easy" && 'bg-green-50 border border-green-300',
                    item.level === "medium" && 'bg-orange-50 border border-orange-300',
                    item.level === 'hard' && 'bg-red-50 border border-red-300'  
                  )}>{item.level}</p>
                  <p className='rounded-full bg-gray-100 border py-1 px-4'>{item.category}</p>
                </CardContent>
              </div>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <p>$ {item.price}</p>
                <Link href={`/courses/${item.courseId}`}>
                  <Button className='bg-blue-500 hover:bg-blue-400 flex gap-2 hover:gap-4 transition-all'>
                    Enroll This Course <BookPlus className='w-5 h-5' />
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

export default CoursesPage