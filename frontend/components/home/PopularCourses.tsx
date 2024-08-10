import { popularCourses } from '@/lib/constants'
import React from 'react'
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

const PopularCourses = () => {
  return (
    <div className='wrapper space-y-8'>
      <h3 className='text-3xl font-bold text-center'>Our Most Popular Courses</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {popularCourses.map((item, index) => {
          return (
            <PopularCoursesCard
              key={index} 
              courseName={item.courseName}
              instructor={item.instructor}
              rating={item.rating}
              description={item.description}
              ctaButton={item.ctaButton}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PopularCourses


const PopularCoursesCard = ({
  courseName,
  instructor,
  rating,
  description,
  ctaButton,
}:{
  courseName: string
  instructor: string
  rating: number
  description: string
  ctaButton: string
}) => {
  return (
    <div className='p-4 border-2 border-black flex flex-col justify-between rounded-lg space-y-4 shadow-custom'>
      <div>
        <p className='text-[18px] font-bold'>{courseName}</p>
        <p className='text-[14px] text-black/70'>{instructor}</p>
      </div>
      <div className='space-y-4'>
        <p className='flex items-center gap-x-2'>{rating} <Star className='h-4 w-4' /></p>
        <div>
          <p className='text-sm'>{description}</p>
        </div>
        <Button className='rounded-full'>
          {ctaButton}
        </Button>
      </div>
    </div>
  )
}