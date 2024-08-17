import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className='wrapper text-center space-y-8 flex flex-col items-center text-white pb-28'>
      <div className='space-y-2'>
        <h3 className='text-3xl font-bold'>Start Your Learning Journey Today!</h3>
        <p className='text-white'>Transform your career, gain new skills, and achieve your goals with Sea Study.</p>
      </div>
      <Link href={"/sign-in"}>
        <Button className='rounded-full w-[200px] flex items-center gap-2 shadow-custom bg-white hover:bg-white text-black hover:gap-4 transition-all'>
          Join Now <Sparkles className='h-5 w-5' />
        </Button>
      </Link>
    </div>
  )
}

export default CTA