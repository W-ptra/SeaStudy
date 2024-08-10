import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react';
import { BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className='mt-[100px] wrapper flex flex-col text-center items-center gap-y-8 h-[550px] justify-center'>
      <div className='space-y-2'>
        <h1 className='text-4xl font-extrabold'>Unlock Your Potential with Sea Study – Learn Anytime, Anywhere!</h1>
        <h5>Join millions of learners mastering new skills, advancing their careers, and exploring new hobbies with our expert-led courses.</h5>
      </div>
      <div className='flex gap-x-4'>
        <Button variant={"default"} className='rounded-full flex items-center gap-4'>Explore Courses <Sparkles className='h-5 w-5' /></Button>
        <Button variant={"outline"} className='rounded-full'>Get Started</Button>
      </div>
    </div>
  )
}

export default Hero