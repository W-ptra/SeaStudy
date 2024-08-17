// import React from 'react'
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { CourseDataType } from '@/lib/schemas';

const PopularCourses = ({popularCourses}:{popularCourses: CourseDataType[]}) => {
  return (
    <div className='wrapper space-y-8'>
      <h3 className='text-3xl font-bold text-center text-white'>Our Most Popular Courses</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {popularCourses.map((item, index) => {
          return (
            <PopularCoursesCard
              key={item.id} 
              courseName={item.name}
              // instructor={item.instructorName}
              instructor=""
              rating={item.avgRating}
              description={item.description}
              ctaButton="View Course"
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
  const truncateDescription = (text: string, maxWords: number) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const truncatedDescription = truncateDescription(description, 50);

  return (
    <div className='p-4 border-2 shadow-custom text-white bg-white/20 flex flex-col justify-between rounded-lg space-y-4'>
      <div className='space-y-2'>
        <p className='text-[18px] font-bold'>{courseName}</p>
        <p className='flex items-center gap-x-2'>{rating} <Star className='h-4 w-4' /></p>
        <p className='text-sm text-white/70'>{truncatedDescription}</p>
      </div>
      <div className='space-y-4'>
        <Button className='rounded-full bg-white shadow-custom text-black hover:bg-white' >
          {ctaButton}
        </Button>
      </div>
    </div>
  )
}