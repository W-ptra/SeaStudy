import React from 'react'
import Link from 'next/link';

// Component Import
import { Button } from '../ui/button'

// Icon Import
import { Sparkles } from 'lucide-react';

// Image Import
import Book from '@/public/images/home/Book1.svg'
import Image from 'next/image';
import Gradient from '@/public/images/home/Gradient3.svg'

const Hero = () => {
  return (
    <div className='relative md:mt-[100px] wrapper flex md:flex-row items-center gap-y-16 md:gap-y-8 h-full md:h-[550px] justify-between py-28 flex-col-reverse md:py-0'>
      <div className='flex flex-col text-center items-center md:items-start md:text-start max-w-[650px] text-white gap-y-12'>
        <div className='space-y-4'>
          <h1 className='text-5xl font-extrabold'>Unlock Your Potential with Sea Study – Learn Anytime, Anywhere!</h1>
          <h5>Join millions of learners mastering new skills, advancing their careers, and exploring new hobbies with our expert-led courses.</h5>
        </div>
        <div className='flex flex-col md:flex-row gap-4'>
          <Link href={"/courses"}>
            <Button variant={"default"} className='shadow-custom rounded-full flex items-center justify-center w-[200px] gap-2 hover:gap-4 transition-all bg-white text-black hover:bg-dark/10'>Explore Courses <Sparkles className='h-5 w-5' /></Button>
          </Link>
        </div>
      </div>
      <Image 
        src={Book}
        alt='Book 3D'
        className='h-[300px] w-[300px] md:h-[400px] md:w-[400px]'
      />

      <Image 
        src={Gradient}
        alt='Gradient'
        className='absolute -z-20 left-0 translate-x-[-550px] translate-y-20 opacity-75'
      />
    </div>
  )
}

export default Hero