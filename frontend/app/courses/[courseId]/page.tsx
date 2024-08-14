"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn, getLastPathSegment } from '@/lib/utils';

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

// Button Import
import { Button } from '@/components/ui/button';

const CourseDetail = () => {
  const pathname = usePathname();
  const lastPathname = getLastPathSegment(pathname)
  const data = course.find(item => item.name === lastPathname)
  // @ts-ignore
  const { name, description, category, level } = data

  return (
    <div className='space-y-8'>

      {/* Header */}
      <div className='w-full flex items-start justify-between'>
        <div className='space-y-2'>
          <h3 className='text-3xl font-bold'>{name}</h3>
          <p className='text-black/75'>{description}</p>
          <div className='flex gap-x-4 items-center'>
            <p className={cn(
              'rounded-full bg-gray-50 border py-1 px-4',
              level === 'Easy' && 'bg-green-50 border border-green-300',
              level === 'Medium' && 'bg-orange-50 border border-orange-300',
              level === 'Hard' && 'bg-red-50 border border-red-300'  
            )}>{level}</p>
            <p className='rounded-full bg-gray-100 border py-1 px-4'>{category}</p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data?.topics.map((item, index) => {
          return (
            <Card key={index} className='flex flex-col justify-between'>
              <div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex w-full flex-col md:flex-row gap-y-4 justify-start gap-x-4'>
                  <p className='rounded-full py-1 px-4 bg-blue-100 border border-blue-300'>{item.materials.length > 0 ? item.materials.length : 0} Materials</p>
                </CardContent>
              </div>
              <CardFooter>
                <Link href={`/dashboard/courses/${lastPathname}/${item.title}`}>
                  <Button size={'sm'} className='bg-blue-500 hover:bg-blue-400'>
                    See Materials
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

export default CourseDetail