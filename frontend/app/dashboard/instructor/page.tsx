import CreateCourse from '@/components/dashboard/CreateCourse'
import React from 'react'

// Card Import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'

// Button Import
import { Button } from '@/components/ui/button'

const course = [
  {
    "name": "Introduction to Programming",
    "description": "Learn the basics of programming using Python. Perfect for beginners.",
    "category": "Programming",
    "level": "Easy",
    "price": 29.99
  },
  {
    "name": "Advanced JavaScript",
    "description": "Master JavaScript with advanced concepts and techniques.",
    "category": "Web Development",
    "level": "Medium",
    "price": 49.99
  },
  {
    "name": "Data Structures and Algorithms",
    "description": "Deep dive into data structures and algorithms to enhance your problem-solving skills.",
    "category": "Computer Science",
    "level": "Hard",
    "price": 69.99
  },
]

const InstructorDashboard = () => {
  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <h3 className='text-3xl font-bold'>My Course</h3>
        <CreateCourse />
      </div>

      {/* Courses */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {course.map((item, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                <p className='rounded-full bg-gray-50 border py-1 px-4'>{item.category}</p>
                <p className={cn(
                  'rounded-full bg-gray-50 border py-1 px-4',
                  item.level === 'Easy' && 'bg-green-50 border border-green-300',
                  item.level === 'Medium' && 'bg-orange-50 border border-orange-300',
                  item.level === 'Hard' && 'bg-red-50 border border-red-300'  
                )}>{item.level}</p>
              </CardContent>
              <CardFooter className='w-full flex flex-col items-start gap-y-4'>
                <p>$ {item.price}</p>
                <Button size={'sm'} variant={'secondary'}>
                  Manage Course
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default InstructorDashboard