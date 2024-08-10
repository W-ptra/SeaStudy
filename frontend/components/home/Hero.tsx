import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center gap-y-8 h-[550px] justify-center'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-extrabold text-center'>Unlock Your Potential with Sea Study – Learn Anytime, Anywhere!</h1>
        <h5>Join millions of learners mastering new skills, advancing their careers, and exploring new hobbies with our expert-led courses.</h5>
      </div>
      <div className='flex gap-x-4'>
        <Button variant={"default"} className='rounded-full'>Explore Courses</Button>
        <Button variant={"outline"} className='rounded-full'>Get Started</Button>
      </div>
    </div>
  )
}

export default Hero